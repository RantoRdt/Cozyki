import React from "react";
import useLanguage from "../../hooks/useLanguage";
import PasswordChange from "./PasswordChange";
import PPChange from "./PPChange";

const Settings = () =>{
    const { text } = useLanguage()

    return <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h3>{text.settings}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <PPChange/>
            <PasswordChange/>
        </div>
    </div>
}

export default Settings