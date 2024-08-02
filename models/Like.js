import { Schema, model } from 'mongoose';

const liSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Person' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true })

const Like = model('Like', liSchema)
export default Like
