import React, { useState } from "react";
import usePost from "../../hooks/usePost";
import useLanguage from "../../hooks/useLanguage";

const Login = () =>{
    const { text } = useLanguage()
    const { login } = usePost()

    const [ visiblePassword, setVisiblePassword ] = useState(false)

    const [data, setData]= useState({ username: "", password: ""})
    const handleInputs = e =>{
        const { name, value } = e.target
        setData({...data, [name]: value})
    }

    return(
        <form onSubmit={e => { e.preventDefault(); login(data)}}>
            <input type="text" autoComplete="off" name="username" placeholder={text.user} onChange={handleInputs}/>
            <input type={ visiblePassword ? "text" : "password"} name="password" placeholder={text.mdp} id="login" onChange={handleInputs}/>
            <button type="button" className="text" onClick={() => setVisiblePassword(v => !v)}>{visiblePassword ? text.hidepassword : text.showpassword}</button>
            <button type="submit">{text.login}</button>
        </form>
    )
}

export default Login