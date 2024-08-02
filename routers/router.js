import { Router } from 'express'
import { getUserById, getUsers, login, register } from "../controllers/PersonController.js"
import { downloadFile, sendMessage, sendFile, deleteMessage, getMessageByUser } from "../controllers/MessageController.js"
import { getPosts, addPost, deletePost, getPostsByUser, likePost, unlikePost } from "../controllers/PostController.js"
import { handleAuth } from '../controllers/AuthController.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/users/get', handleAuth, getUsers)
router.get('/user/get/:id', getUserById)
router.get('/posts/get', getPosts)
router.post('/post/create', handleAuth, addPost)
router.delete('/post/delete/:id', handleAuth, deletePost)
router.post('/file/download', downloadFile)
router.post('/message/send', handleAuth, sendMessage)
router.post('/file/send', handleAuth, sendFile)
router.delete('/message/delete/:id', handleAuth, deleteMessage)
router.get('/messages/getbyuser', handleAuth, getMessageByUser)
router.get('/posts/getbyuser', getPostsByUser )
router.post('/post/like', handleAuth, likePost)
router.delete('/post/unlike', handleAuth, unlikePost)

export default router