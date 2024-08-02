import { createLike, deleteLike, findByFields } from "../services/LikeService.js"
import { getAllPosts, verifyPostAuthor, deletePost, createPost, getPostsByAuthor, getPostById } from "../services/PostService.js"
import multer from "multer"

const get = async (req, res) =>{
    const posts = await getAllPosts()
    res.status(200).send({ posts })
}

const getByUser = async (req, res) => {
    const userId = req.userId
    const posts = await getPostsByAuthor(userId)

    res.status(200).send({ posts })
}

const uploadFile= multer({storage: multer.diskStorage({
    destination: process.env.FILES_URL,
    filename: (req, file, cb) => cb(null, file.originalname)
})}).single('file')

const create = async (req, res) =>{
    const authorId = req.userId
    const { content, hasImage } = req.body
    if (hasImage) uploadFile(req, res, async (error)=>{
        if (error) return error  
        try {
            const { originalname: image } = req.file
            await createPost(authorId, content, image)
            res.status(201).send()
        }
        catch (error) { res.status(500).send({ error }) } 
    })
    else try {
        await createPost(authorId, content)
        res.status(201).send()
    } catch (error) { res.status(500).send({ error }) }
}

const remove = async (req, res) =>{
    const authorId = req.userId
    const { id } = req.params

    const authorized = await verifyPostAuthor(authorId, id)
    if (!authorized) res.status(403).send()

    try {
        await deletePost(id)
        res.status(200).send()
    } catch (error) { res.status(500).send({ error }) }

}

const likePost = async (req, res) =>{
    const userId = req.userId
    const { postId } = req.body

    try {
        const post = await getPostById(postId)
        if (!post) res.status(404).send()
                
        const likeId = await createLike(postId, userId)
        post.likes.push(likeId)
        await post.save()

        res.status(201).send()
    } catch (error) { res.status(500).send({ error }) }
}

const unlikePost = async (req, res) =>{
    const userId = req.userId
    const { postId } = req.body

    try {
        const like = await findByFields(userId, postId)
        if (!like) res.status(404).send()

        const post = getPostById(postId)
        if (!post) res.status(404).send()

        const { _id: id } = like
        post.likes.pull(id)
        await post.save()
        await deleteLike(id)

        res.status(200).send()
    } catch (error) { res.status(500).send({ error }) }
}

export { get as getPosts, create as addPost, remove as deletePost, getByUser as getPostsByUser, likePost, unlikePost }