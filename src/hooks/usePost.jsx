import { useContext } from "react"
import { login as loginAPI, register as registerAPI, updatePassword, updatePicture, sendFile as sendFileAPI, sendMessage as sendMessageAPI } from "../API/axios"
import useFeedback from "./useFeedback"
import { AuthStateContext } from "../state/AuthState"
import { useNavigate } from "react-router-dom"
import routes from "../helper/routes"
import useLanguage from "./useLanguage"
import { useSocket } from "../providers/Socket"

const usePost = () =>{
    const { setAuthenticated, setDisconnected, userId } = useContext(AuthStateContext)
    const { names, show, clear } = useFeedback()
    const { text } = useLanguage()
    const { socket } = useSocket()

    const navigate = useNavigate()

    const login = async data => {
        clear()
        try {
            const { status, token } = await loginAPI(data)
            if (status == 200){
                await setAuthenticated(token)
                return navigate(routes.home)
            }
        } catch (error) {
            switch (error.response?.status){
                case 404: return show("error", text.usernamenotfound, names.auth)
                case 403: return show("error", text.mdpincorrect, names.auth )
                default:
            }
            return show("error", text.smthngwntwrng, names.auth )
        }
    }

    const register = async data => {
        clear()
        const { password1, password2 } = data
        if (password1 != password2) return show("error", text.mdpnotidentic, names.auth)
        if (password1.length < 6) return show("error", text.mdpminlength, names.auth)
        try {
            const { status, token } = await registerAPI(data)
            if (status == 201){
                await setAuthenticated(token)
                return navigate(routes.home)
            }
        } catch (error) {
            switch (error.response?.status){
                case 403: return show("error", text.nameexists, names.auth )
                default:
            }
            return show("error", text.smthngwntwrng, names.auth )
        }
    }

    const logout = async () => {
        await setDisconnected()
        socket.emit('logout', { userId })
        navigate(routes.auth)
    }

    const changePassword = async data =>{
        clear()
        const { currentpassword, newpassword1, newpassword2 } = data
        if (newpassword1 != newpassword2) return show("error", text.mdpnotidentic, names.updatepassword)
        if (newpassword1.length < 6) return show("error", text.mdpminlength, names.updatepassword)
        try {
            const { status } = await updatePassword({currentpassword, newpassword: newpassword1})
            if (status == 200) return show("success", text.success, names.updatepassword)
        } catch (error) {
            switch (error.response?.status){
                case 403: return show("error", text.mdpincorrect, names.updatepassword )
                default:
            }
            return show("error", text.smthngwntwrng, names.updatepassword )
        }
    }

    const changePicture = async data =>{
        clear()
        try {
            const { status } = await updatePicture(data)
            if (status == 200) {
                show("success", text.success, names.updatepicture)
                window.location.reload()
            }
        } catch (error) { return show("error", text.smthngwntwrng, names.updatepicture ) }
    }

    const sendMessage = async data => {
        const { message, file, receiverId } = data
        try {
            if (file) await sendFileAPI({receiverId, file})
            else await sendMessageAPI({receiverId, mimetype: 'text', content: message})
            socket.emit('message-send', { receiverId })
        } catch (error) { }
    }

    return { login, register, logout, changePassword, changePicture, sendMessage }
}

export default usePost