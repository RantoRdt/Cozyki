import React, { useContext, useState } from "react";
import routes from "../../helper/routes"
import { faEnvelope, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LanguageSwitcher from "../Language/Main";
import { AuthStateContext } from "../../state/AuthState";
import useLanguage from "../../hooks/useLanguage";
import usePost from "../../hooks/usePost";

const Header = ({unrestricted}) => {
    const { userId } = useContext(AuthStateContext)
    const { logout } = usePost()
    const [ showLogout, setShowLogout ] = useState(false)
    const { text } = useLanguage()

    return <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px" }}>
        <div style={{ height: "40px", width: "40px", borderRadius: "50%", background: "#fff", cursor: "pointer" }}>
            <a href={routes.home}>
                <img src='/logo.png' style={{ height: "100%", width: "100%" }}/>
            </a>
        </div>
        <div style={{ flexDirection: "row", gap: '5px', display: "flex" }}>
            <button className="icon" style={{ visibility: "hidden" }}></button>
            { unrestricted && <>
                <button className="icon"><a href={routes.profilePart + '/' + userId }><FontAwesomeIcon className="icon" icon={faUser}/></a></button>
                <button className="icon"><a href={routes.messages}><FontAwesomeIcon className="icon" icon={faEnvelope}/></a></button>
                <button className="icon" onClick={() => setShowLogout(true)}><FontAwesomeIcon className="icon" icon={faSignOutAlt}/></button>
            </> }
            <LanguageSwitcher/>
        </div>
        {
            showLogout && <div className="primary" style={{ position: "fixed", gap: "25px", display: "flex", flexDirection: "column", padding: "25px 0", top: "50%", left: "50%", transform: 'translate(-50%, -50%)', borderRadius: "10px" }}>
                <p style={{ textAlign: "center" }}>{text.deconnexion}</p>
                <div style={{ flexDirection: "row" }}>
                    <button onClick={() => {logout(); setShowLogout(false)}}>{text.yes}</button>
                    <button onClick={() => setShowLogout(false)}>{text.no}</button>
                </div>
            </div>
        }
    </header>
}

export default Header