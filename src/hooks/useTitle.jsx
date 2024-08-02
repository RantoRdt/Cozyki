import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useLanguage from "./useLanguage";
import routes from "../helper/routes";
import { snName } from "../helper/conf";

const useTitle = () =>{
    const [ title, setTitle ] = useState()
    const location = useLocation()
    const { text } = useLanguage()

    const get = () =>{
        switch (location.pathname){
            case routes.auth : return `${text.titleauth} - ${snName}`
            case routes.messages : return `${text.titlemess} - ${snName}`
            case routes.home : return `${snName}`
            default:
                if (location.pathname.includes(routes.profilePart)) return `profile - ${snName}`
                return '...'
        }
    }

    useEffect(()=>{setTitle(get())}, [location])

    return title
}

export default useTitle