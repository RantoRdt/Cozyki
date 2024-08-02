import Post from "../models/Post.js"
import { findById } from "./PersonService.js"

const getAllPosts = async () => {
    const list = await Post.find()
    let finalList = []
    list.forEach(async p =>{
        const { authorId, content, _id: id, likesIds, createdAt: date } = p
        const author = await findById(authorId)
        const { username, image } = author
        let likes = []
        likesIds.forEach(async id => {
            const { username, image } = await findById(id)
            likes.push({ id, username, image })
        })
        finalList.push({
            id, content, likes, date,
            author: { id: authorId, username, image }
        })
    })
    return finalList
}

const getPostById = async id => { return await Post.findById(id) }

const getPostsByAuthor = async authorId => { return await Post.find({ authorId }) }

const verifyPostAuthor = async (authorId, id) => {
    const post = await Post.findById(id)
    if (!post) return false
    return post.authorId == authorId
}

const createPost = async (authorId, content, image=null) => {
    const post = new Post({ authorId, content, image })
    await post.save()
}

const deletePost = async id => { await Post.findByIdAndDelete(id) }

export { getAllPosts, getPostsByAuthor, verifyPostAuthor, deletePost, createPost, getPostById }