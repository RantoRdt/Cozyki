import { Schema, model } from 'mongoose'

const poSchema= new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: 'Person' },
    content: { type: String },
    image: { type: String },
    likesIds: [{ type: Schema.Types.ObjectId, ref: 'Like' }]
},{timestamps: true})

const Post = model('Post', poSchema)
export default Post