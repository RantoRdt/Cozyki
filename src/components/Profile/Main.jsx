import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProfileData } from "../../API/axios";
import PostItem from "../Home/PostItem";
import Settings from "../Settings/Main";
import { AuthStateContext } from "../../state/AuthState";

const Profile = () => {
    const { id } = useParams()
    const { userId } = useContext(AuthStateContext)
    const [ data, setData ] = useState({ image: "", posts: [], username: "" })

    const getData = async () =>{
        try { setData(await getProfileData(id)) }
        catch (error) { console.log(error) }
    }
    useEffect(() =>{getData()}, [])

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "70%", padding: "20px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{height: "150px", width: "150px", flexShrink: "0", borderRadius: "50%", overflow: "hidden", border: "1px solid #111" }}>
                        <img src={data.image} alt="" style={{ height: "100%", width: "100%" }} />
                    </div>
                    <h2>{data.username}</h2>
                </div>
                <div style={{ width: "90%" }}>{ data.posts.map(p => <div id={p.id}><PostItem data={{ content: p.content, date: p.date, likes: p.likes, author: { id, username: data.username } }}/></div>) }</div>
            </div>
            { (userId == id) && <div style={{ width: "30%" }}>
                <Settings/>
            </div>}
        </div>
    )
}

export default Profile