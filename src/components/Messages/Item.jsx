import React, { useState } from "react";
import { url } from "../../helper/conf";
import { downloadFile as downloadFileAPI } from "../../API/axios";
import downloadFile from 'js-file-download'

const MessageItem = ({data: {content, date, sender, mimetype}}) =>{
    const [ hover, setHover ] = useState(false)

    const download = async e => {
        e.preventDefault()
        try {
            const { data } = await downloadFileAPI({ name: content })
            downloadFile(data, content)
        } catch (error) { console.error(error) }
    }

    const Content = () =>{
        switch (mimetype){
            case 'text': return <p>{content}</p>
            case 'image': return <img onClick={download} src={`${url}/assets/${content}`}/>
            default: return <div onClick={download} style={{ cursor: "pointer" }}>{content}</div>
        }
    }
    
    return (
        <div className={"message-container " + ((sender) ? "sender-message" : "receiver-message")}>
            <div className="inner" onClick={() => setHover(v => !v)} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <Content/>
            </div>
            <p style={{ height: hover ? "25px" : "0px", overflow: "hidden", transition: ".3s" }}>{date}</p>
        </div>
    )
}

export default MessageItem