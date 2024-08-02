import React, { useState, useEffect } from "react";
import useLanguage from "../../hooks/useLanguage";
import { getUsers } from "../../API/axios";
import routes from "../../helper/routes";
import { useSocket } from "../../providers/Socket";

const Users = () => {
    const { text } = useLanguage()
    const [ users, setUsers ] = useState([])
    const [ connected, setConnected ] = useState([])
    const [ search, setSearch ] = useState("")

    useEffect(() => {
        const initUsers = async () =>{
            try { setUsers(await getUsers()) }
            catch (error) { console.log(error) }
        }
        initUsers()
    }, [])

    const { socket } = useSocket()
    useEffect(() => { socket.on('connected-list', ({ list }) => setConnected(list))}, [socket])

    return <div style={{ width: "30%", padding: "0 15px", boxSizing: "border-box" }}>
        <h3>{text.users}</h3>
        <input type="text" placeholder={text.lookforuser} onChange={e => setSearch(e.target.value)} style={{ margin: "10px 0" }}/>
        <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
            {
                users
                .filter(u => u.username.toLowerCase().includes(search.toLowerCase()))
                .map(u => <a className="no-underline" key={u.id} href={routes.profilePart + '/' + u.id}>
                    <div className="user-container">
                        <div style={{ position: "relative", height: "40px", width: "40px", flexShrink: "0", borderRadius: "50%", overflow: "hidden", border: "1px solid #111" }}>
                            <img src={`${u.image}`} style={{ height: '100%', width: "100%" }} alt=""/>
                            { connected.includes(u.id) && <div style={{ position: "absolute", width: "15px", height: "15px", background: "#0f0", bottom: "0", right: "0", zIndex: "2" }}></div>}
                        </div>
                        <div style={{ width: "calc(100% - 70px)", flexGrow: "1"}}>
                            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: "none" }}>{u.username}</p>
                        </div>
                    </div>
                </a>
                )
            }
        </div>
    </div>
}

export default Users