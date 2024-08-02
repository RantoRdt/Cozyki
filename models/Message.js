import { Schema, model } from 'mongoose'

const mSchema= new Schema({
    mimetype: {type: String},
    content: { type: String },
    senderId: { type: Schema.Types.ObjectId, ref: 'Person' },
    receiverId: { type: Schema.Types.ObjectId, ref: 'Person' },
    seen: {type: Boolean} // By receive
},{timestamps: true})

const Message = model('Message', mSchema)
export default Message