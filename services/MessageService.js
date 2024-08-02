import Message from "../models/Message.js"
import { findById } from "./PersonService.js"

const get = async userId => {
    const messages = await Message.find({$or: [{ senderId: userId },{ receiverId: userId }]})
    let finalList = []
    messages.forEach(async m => {
        const { _id: id, mimetype, content, senderId, seen, createdAt: date } = m
        const message = { id, mimetype, content, seen, date, sender: userId === senderId}

        const index = finalList.findIndex(l => l.correspId == m.receiverId)
        if (index >= 0) finalList[index].messages.push(message)
        else {
            const correspId = (userId == m.receiverId) ? m.senderId : m.receiverId
            const user = await findById(correspId)
            const { _id: id, username, image } = user
            finalList.push({ user:  { id, username, image }, messages: [message] })
        }
    })
    return finalList
}

const createMessage = async (senderId, receiverId, content, mimetype) => {
    const message = new Message({ senderId, receiverId, content, mimetype, seen: false })
    await message.save()
}

const remove = async id => await Message.findByIdAndDelete(id)

const verifyMessageSender = async (senderId, id) => {return !!await Message.findOne({ senderId, id }) }

export { get as getMessages, createMessage, remove as deleteMessage, verifyMessageSender }