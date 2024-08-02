import React, { useState, useRef } from "react";
import useLanguage from "../../hooks/useLanguage";
import usePost from "../../hooks/usePost";
import useFeedback from "../../hooks/useFeedback";
import { faTimes, faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PPChange = () =>{
    const { text } = useLanguage()
    const fileInput = useRef(null)
    const { changePicture } = usePost()
    const { Feedback, names } = useFeedback()
    const [image, setImage]= useState(null)

    return <form onSubmit={e =>{ e.preventDefault(); changePicture({image}) }} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p>{text.chngpdp}</p>
        <button className="icon icon-outlined" onClick={() => {
            image ? setImage(null) : fileInput.current.click()
        }}><FontAwesomeIcon icon={image ? faTimes : faImage}/></button>
        <div style={{ display: "flex", gap: "10px" }}>
            <input type="file" accept="image/*" ref={fileInput} style={{ display: "none" }} onChange={e => setImage(e.target.files[0])}/>
            { image && <img src={URL.createObjectURL(image)} alt="" style={{ height: "150px" }}/>}
        </div>
        <button type="submit" disabled={!image}>{text.save}</button>
        <Feedback name={names.updatepicture}/>
    </form>
}

export default PPChange