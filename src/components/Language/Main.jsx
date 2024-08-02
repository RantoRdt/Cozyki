import React, { useState } from "react";
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FR, GB, MG } from "country-flag-icons/react/3x2"
import useLanguage from "../../hooks/useLanguage";

const LanguageSwitcher = () =>{
    const [ show, setShow ] = useState(false)
    const { changeLanguage } = useLanguage()

    return <div style={{ position: "relative", width: '37px' }}>
        <div style={{ position: "absolute", top: "0", height: show ? "135px" : "35px", width: "100%", overflow: "hidden", transition: "height .5s"}}>
            <button className="icon" onClick={() => setShow(s => !s)}><FontAwesomeIcon className="icon" icon={faGlobe}/></button>
            <div style={{ position: "relative", height: "100px", overflow: "hidden" }}>
                <div style={{ position: "relative", top: show ? "5px" : "-120px", left: "0%", transition: 'top .5s' }}>
                    <button className="flag" onClick={() => changeLanguage('mg')}><MG/></button>
                    <button className="flag" onClick={() => changeLanguage('fr')}><FR/></button>
                    <button className="flag" onClick={() => changeLanguage('en')}><GB/></button>
                </div>
            </div>
        </div>
    </div>
}

export default LanguageSwitcher