import { findByName, handleUnicity, createUser, findAllButOne, findById } from "../services/PersonService.js"
import { generateToken } from "../services/TokenService.js"
import { encodePassword, verifyPassword } from "../services/EncoderService.js"
import { getPostsByAuthor } from "../services/PostService.js"

const login = async (req, res) => {
    const { username, password } = req.body
    
    const user = await findByName(username)
    if (!user) res.status(404).send()

    else try{
        const match = await verifyPassword(password, user.password)
        if (match){
            const token = generateToken(user.id)
            res.status(200).send({ token })
        }
        else res.status(403).send()
    } catch (error) { res.status(500).send({ error }) }
}


const register = async (req, res) => {
    const { username, password } = req.body

    const unique = await handleUnicity(username)
    if (!unique) res.status(403).send()
    else{
        try {
            const id = await createUser(username, await encodePassword(password))
            if (id){
                const token = generateToken(id)
                res.status(201).send({ token })
            }
            res.status(500).send({ error: "Something went wrong" })
        } catch (error) { res.status(500).send({ error }) }
    }
}

const getUsers = async (req, res) => {
    const userId = req.userId

    const list = await findAllButOne(userId)
    let fList = []
    list.forEach(l => {
        const { _id: id, username, image } = l
        fList.push({ id, username, image })
        res.status(200).send({ users: fList })
    })
}

const getUserById = async (req, res) =>{
    try {
        const { id } = req.params
        const user = await findById(id)
        const { image, username } = user
        const pposts = await getPostsByAuthor(id)
        let posts = []
        pposts.forEach(async p =>{
            const { content, _id: id, likesIds, createdAt: date } = p
            let likes = []
            likesIds.forEach(async id => {
                const { username, image } = await findById(id)
                likes.push({ id, username, image })
            })
            posts.push({ id, content, likes, date })
        })
        res.status(200).send({ image, username, posts })
    } catch (error) {
        res.status(500).send({ error })
    }
}

export { login, register, getUsers, getUserById }