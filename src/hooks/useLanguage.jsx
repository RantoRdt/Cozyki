import { useState } from "react"
import getText from "../helper/texts" 
import { storageName } from "../helper/conf"

const tokenName = storageName.lang

const useLanguage = () =>{
    const [ language, setLanguage ] = useState(localStorage.getItem(tokenName) || 'en')

    const changeLanguage = lang =>{
        localStorage.setItem(tokenName, lang)
        setLanguage(lang)
        window.location.reload()
    }

    const text = getText(language)

    return { text, language, changeLanguage }
}

export default useLanguage
