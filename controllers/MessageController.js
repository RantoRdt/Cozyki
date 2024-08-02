import { createMessage, deleteMessage as remove, verifyMessageSender, getMessages } from "../services/MessageService.js"
import multer from "multer"

const downloadFile = (req, res) => {
    const { name } = req.body
    res.download(`${__dirname}/${process.env.FILES_URL}/${name}`)
}

const sendMessage = async (req, res) => {
    const senderId = req.userId
    const { receiverId, content, mimetype } = req.body

    try {
        await createMessage(senderId, receiverId, content, mimetype)
        res.status(200).send()
    }
    catch (error) { res.status(500).send({ error }) }
}

const uploadFile= multer({storage: multer.diskStorage({
    destination: process.env.FILES_URL,
    filename: (req, file, cb) => cb(null, file.originalname)
})}).single('file')

const sendFile = async (req, res) => {
    uploadFile(req, res, async (error)=>{
        if (error) return error  
        try {
            const senderId = req.userId
            const { receiverId } = req.body
            const { originalname: content, mimetype } = req.file
            await createMessage(senderId, receiverId, content, mimetype.slice(0,5))
            res.status(201).send()
        }
        catch (error) { res.status(500).send({ error }) } 
    })
}

const deleteMessage = async (req, res) =>{
    const senderId = req.userId
    const { id } = req.params

    const authorized = await verifyMessageSender(senderId, id)
    if (!authorized) res.status(403).send()

    try {
        await remove(id)
        res.status(200).send()
    }
    catch (error) { res.status(500).send({ error }) }
}

const getMessageByUser = async (req, res) => {
    const userId = req.userId
    const messages = await getMessages(userId)

    res.status(200).send({ messages })
}

export { downloadFile, sendMessage, sendFile, deleteMessage, getMessageByUser }