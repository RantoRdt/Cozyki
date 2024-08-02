import React, { useState } from "react";
import useLanguage from "../../hooks/useLanguage";
import usePost from "../../hooks/usePost";
import useFeedback from "../../hooks/useFeedback";

const PasswordChange = () =>{
    const { text } = useLanguage()
    const [ showPassword, setShowPassword ] = useState(false)
    const { changePassword } = usePost()
    const { Feedback, names } = useFeedback()
    const [data, setData]= useState({ currentpassword: "", newpassword1: "", newpassword2: ""})
    const handleInputs = e =>{
        const { name, value } = e.target
        setData({...data, [name]: value})
    }

    return <form onSubmit={e => { e.preventDefault(); changePassword(data)}} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <p>{text.chngmdp}</p>
        <input type={showPassword ? "text" : "password"} name="currentpassword" placeholder={text.curMdp} onChange={handleInputs}/>
        <input type={showPassword ? "text" : "password"} name="newpassword1" placeholder={text.newMdp} onChange={handleInputs}/>
        <input type={showPassword ? "text" : "password"} name="newpassword2" placeholder={text.confNewMdp} onChange={handleInputs}/>
        <button type="button" className="text" onClick={() => setShowPassword(v => !v)}>{showPassword ? text.hidepassword : text.showpassword}</button>
        <button type="submit" disabled={!data.currentpassword?.length || !data.newpassword1.length || !data.newpassword2.length}>{text.save}</button>
        <Feedback name={names.updatepassword}/>
    </form>
}

export default PasswordChange