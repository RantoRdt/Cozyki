import React, { useState, useEffect, useRef } from "react";
import useLanguage from "../../hooks/useLanguage";
import { getAllPosts } from "../../API/axios";
import { faTimes, faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PostItem from "./PostItem";

const Posts = () => {
    const { text } = useLanguage()
    const [ posts, setPosts ] = useState([])

    const [ postContent, setPostContent ] = useState('')
    const [ postFile, setPostFile ] = useState(null)
    const postInput = useRef(null)
    const fileInput = useRef(null)

    const initPosts = async () =>{
        try { setPosts(await getAllPosts()) }
        catch (error) { console.log(error) }
    }

    useEffect(() => { initPosts() }, [])

    return (
        <div style={{ width: "70%", height: "100%", display: "flex", justifyContent: "center", overflowY: "scroll" }}>
            <div style={{ width: "80%", padding: "15px 0", boxSizing: "border-box", display: "flex", justifyContent: "flex-start", flexDirection: "column", gap: "25px" }}>
                <div style={{ display: "flex", gap: "10px", padding: "0 20px", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <input type="text" ref={postInput} placeholder={text.makepost} style={{ flexGrow: "1" }} onChange={e => setPostContent(e.target.value)}/>
                    <button className="icon icon-outlined" onClick={() => {
                        (postFile) ? setPostFile(null) : fileInput.current.click()
                    }}><FontAwesomeIcon icon={postFile ? faTimes : faImage}/></button>
                    <input type="file" accept="image/*" ref={fileInput} style={{ display: "none" }} onChange={e => setPostFile(e.target.files[0])}/>
                    <button disabled={!postFile && postContent.length == 0} style={{ width: "fit-content", paddingLeft: "25px", paddingRight: "25px" }}>{text.post}</button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    { postFile && <img src={URL.createObjectURL(postFile)} alt="" style={{ height: "150px" }}/> }
                </div>
                <div>{ posts.map(p => <div id={p.id}><PostItem data={p}/></div>) }</div>
            </div>
        </div>
    )
}

export default Posts