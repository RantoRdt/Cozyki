import {useEffect, useState} from "react";

const useFeedback = () =>{
    const eventName = 'sendFeedback'
    const [content, setContent] = useState({})

    useEffect(()=>{
        window.addEventListener(eventName, e => setContent(e.detail))
        return () => window.removeEventListener(eventName, e => setContent(e.detail))
    }, [])
    
    const show = (severity=undefined, message=undefined, name=undefined) => {
        const e = new CustomEvent(eventName, {detail: {severity, message, name }})
        window.dispatchEvent(e)
    }

    const getDisplayerColor = () => {
        switch (content.severity){
            case "error": return "#b00"
            case "success": return "#0b0"
            case "warning": return "#bb0"
            case "info": return "#00b"
            default: return "#000"
        }
    }

    const Displayer = ({ name: displayerName }) =>{
        return content.message && ( content.name == displayerName ) && <p
            style={{ color: getDisplayerColor()}}
        >{content.message}</p>
    }
    
    return {
        Feedback: Displayer,
        show,
        names: { auth: 'auth', updatepassword: 'upwd', updatepicture: 'upct' },
        clear: ()=> show()
    }
}
export default useFeedback