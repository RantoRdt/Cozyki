import React, { useEffect, useState } from "react";
import Header from "../Header/Main";
import useLanguage from "../../hooks/useLanguage";
import Login from "./Login";
import Register from "./Register";
import useFeedback from "../../hooks/useFeedback";
import { snName } from "../../helper/conf";

const Auth = () =>{
    const { text } = useLanguage()
    const [ isLogin, setIsLogin ] = useState(true)
    const { Feedback, names, clear } = useFeedback()
    useEffect(()=>{clear()}, [isLogin])

    return (
        <main className="wrap auth" style={{ display: "flex",justifyContent: "center"}}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <h1>{snName}</h1>
                <p style={{ textAlign: "center" }}>{text.instantConnect}</p>
                <img src='/com.jpg' style={{ width: "75%" }}/>
            </div>
            <div style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
                <h1>{isLogin ? text.signin : text.registerMC}</h1>
                { isLogin ? <Login/> : <Register /> }  
                <Feedback name={names.auth}/>
                <p>{isLogin ? text.notHaveAccount : text.haveAccount}</p>
                <div style={{ width: "50%" }}>
                    <button disabled={isLogin} style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0", width: "50%" }} onClick={() => setIsLogin(true)}>{text.login}</button>
                    <button disabled={!isLogin} style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", width: "50%" }} onClick={() => setIsLogin(false)}>{text.register}</button>
                </div>
            </div>
        </main>
    )
}

export default Auth