import React, { useState } from "react";
import usePost from "../../hooks/usePost";
import useLanguage from "../../hooks/useLanguage";

const Register = () =>{
    const { register } = usePost()
    const { text } = useLanguage()

    const [ visiblePassword, setVisiblePassword ] = useState(false)

    const [data, setData]= useState({ username: "", password1: "", password2: ""})
    const handleInputs = e =>{
        const { name, value } = e.target
        setData({...data, [name]: value})
    }

    return(
        <form onSubmit={e => { e.preventDefault(); register(data)}}>
            <input type="text" name="username" autoComplete="off" placeholder={text.user} onChange={handleInputs}/>
            <input type={ visiblePassword ? "text" : "password"}name="password1" placeholder={text.mdp} id="suscribe1" onChange={handleInputs}/> 
            <input type={ visiblePassword ? "text" : "password"} name="password2" placeholder={text.mdpcnf} id="suscribe2" onChange={handleInputs}/>
            <button type="button" className="text" onClick={() => setVisiblePassword(v => !v)}>{visiblePassword ? text.hidepassword : text.showpassword}</button>
            <button>{text.register}</button>
        </form>
    )
}

export default Register