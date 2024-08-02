import Like from "../models/Like.js";

const createLike = async (postId, userId) => {
    const like = new Like({ postId, userId })
    await like.save()
    return like._id
}

const deleteLike = async id => await Like.findByIdAndDelete(id)

const findByFields = async (userId, postId) => {
    return await Like.findOne({ userId, postId })
}

export { createLike, deleteLike, findByFields }