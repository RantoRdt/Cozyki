import React, { useEffect, useRef, useState } from "react";
import useLanguage from "../../hooks/useLanguage";
import { getMessages } from "../../API/axios";
import MessageItem from "./Item";
import { faTimes, faPaperPlane, faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSocket } from "../../providers/Socket";
import usePost from "../../hooks/usePost";

const Messages = () => {
    const { text } = useLanguage()
    const { sendMessage } = usePost()
    const [ userMessages, setuserMessages ] = useState([])
    const [ current, setCurrent ] = useState(-1)
    const [ connected, setConnected ] = useState([])
    const [ search, setSearch ] = useState("")
    const [ typingReceive, setTypingReceive ] = useState(false)

    const [ message, setMessage ] = useState("")
    const [ file, setFile ] = useState(null)

    const messageInput = useRef(null)
    const fileInput = useRef(null)
    
    const initMessages = async () =>{
        try { setuserMessages(await getMessages()) }
        catch (error) { console.log(error) }
    }

    useEffect(() => { initMessages() }, [])

    const { socket } = useSocket()
    useEffect(() => {
        socket.on('connected-list', ({ list }) => setConnected(list))
        socket.on('typing-receive', () => setTypingReceive(true))
        socket.on('stop-typing-receive', () => setTypingReceive(false))
        socket.on('message-receive', initMessages)
    }, [socket])

    const handleMessage = e =>{
        setMessage(e.target.value)
        socket.emit('typing-send', { receiverId: userMessages[current]?.user?.id })
        const interval = setInterval(() => {
            socket.emit('stop-typing-send', { receiverId: userMessages[current]?.user?.id })
            clearInterval(interval) 
        }, 3000)
    }

    return (
        <main style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px" }}>
            {/* Left */}
            <div style={{ height: "100%", width: "30%" }}>
                <h3>{text.messlist}</h3>
                <input type="text" placeholder={text.lookforuser} onChange={e => setSearch(e.target.value)} style={{ margin: "10px 0" }}/>
                <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>{
                    userMessages
                    .filter(u => u.user?.username?.toLowerCase().includes(search.toLowerCase()))
                    .map((um, i) => <div key={um.user?.id} className="user-container" onClick={() => setCurrent(i)}>
                        <div style={{ position: "relative", height: "40px", width: "40px", flexShrink: "0", borderRadius: "50%", overflow: "hidden", border: "1px solid #111" }}>
                            <img src={`${um.user?.image}`} style={{ height: '100%', width: "100%" }} alt=""/>
                            { connected.includes(um.user?.id) && <div style={{ position: "absolute", width: "15px", height: "15px", background: "#0f0", bottom: "0", right: "0", zIndex: "2" }}></div>}
                        </div>
                        <div style={{ width: "calc(100% - 70px)", flexGrow: "1"}}>
                            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "bold" }}>{um.user?.username}</p>
                            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{um.messages[um.messages.length - 1]?.content}</p>
                        </div>
                    </div>)
                }</div>
            </div>

            {/* Right */}
            <div style={{ height: "100%", width: "70%", display: "flex", flexDirection: "column", padding: "20px 0", boxSizing: "border-box" }}>
                {
                    userMessages[current] && <>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <p>{userMessages[current]?.user?.username}</p>
                            </div>
                            <button className="icon icon-outlined" onClick={() => setCurrent(-1)}><FontAwesomeIcon icon={faTimes}/></button>
                        </div>
                        <div style={{ padding: "20px", boxSizing: "border-box", flexGrow: "1" }}>
                            {              
                                userMessages[current]?.messages
                                ?.map(m => <div key={m.id}>
                                    <MessageItem data={m}/>
                                </div>)
                            }
                            { typingReceive && <p>{text.typing}</p> }
                        </div>
                        <div style={{ display: "flex", gap: "10px", padding: "0 20px", alignItems: "flex-end", justifyContent: "space-between" }}>
                            <div></div>
                            {
                                file ? <img src={URL.createObjectURL(file)} alt="" style={{ width: "200px" }}/>
                                : <input type="text" ref={messageInput} placeholder={text.sendmessage} style={{ flexGrow: "1" }} onChange={handleMessage}/>
                            }
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button className="icon icon-outlined" onClick={() => {
                                    if (file) setFile(null)
                                    else {
                                        fileInput.current.click()
                                        setMessage("")
                                        messageInput.current.value = ""
                                    }
                                }}><FontAwesomeIcon icon={file ? faTimes : faImage}/></button>
                                <input type="file" accept="image/*" ref={fileInput} style={{ display: "none" }} onChange={e => setFile(e.target.files[0])}/>
                                <button onClick={() => sendMessage({ file, message, receiverId: userMessages[current]?.user?.id })} className="icon" disabled={ !file && message.length == 0}><FontAwesomeIcon icon={faPaperPlane}/></button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </main>
    )
}

export default Messages