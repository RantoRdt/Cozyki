import React, { useContext, useState } from "react";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import routes from "../../helper/routes";
import useLanguage from "../../hooks/useLanguage";
import { AuthStateContext } from "../../state/AuthState";

const PostItem = ({ data: { author, content, likes, date } }) =>{
    const { text } = useLanguage()
    const { userId } = useContext(AuthStateContext)
    const [ showLikes, setShowLikes ] = useState(false)

    return <>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{height: "30px", width: "30px", flexShrink: "0", borderRadius: "50%", overflow: "hidden", border: "1px solid #111" }}>
                <img src={author?.image} alt="" style={{ height: "100%", width: "100%" }} />
            </div>
            <a href={routes.profilePart + '/' + author?.id}>{author?.username}</a>
        </div>
        <p>{date}</p>
        <p>{content}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center" }}>
            <div style={{ display: "flex" }}>
                <button onClick={() => setShowLikes(l => !l)} className="text" style={{ display: "flex", alignItems: "center", gap: "7px", width: "fit-content" }}>
                    <p>{likes?.length}</p>
                    <FontAwesomeIcon icon={faThumbsUpSolid} />
                </button>
                {
                    (likes.findIndex(user => user.id == userId) != -1) &&  <p>{(likes.length > 1) ? text.includingyou : text.you}</p>
                }
            </div>
            <button className="icon"><FontAwesomeIcon icon={(likes.findIndex(user => user.id == userId) == -1) ? faThumbsUpRegular : faThumbsUpSolid } /></button>
        </div>
        <div style={{ width: "100%", maxHeight: showLikes ? "250px" : "0px", overflowY: "scroll", overflowX: "hidden", transition: ".5s" }}>
           {
            likes.map(u => <a className="no-underline" key={u.id} href={routes.profilePart + '/' + u.id} style={{ flexBasis: "20%" }}>
                <div className="user-container" style={{ width: "100%" }}>
                    <div style={{ height: "25px", width: "25px", flexShrink: "0", borderRadius: "50%", overflow: "hidden", border: "1px solid #111" }}>
                        <img src={`${u.image}`} style={{ height: '100%', width: "100%" }} alt=""/>
                    </div>
                    <div style={{ width: 'calc(100% - 50px)' }}>
                        <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: "none" }}>{u.username}</p>
                    </div>
                </div>
            </a>
            )
           } 
        </div>
    </>
}

export default PostItem