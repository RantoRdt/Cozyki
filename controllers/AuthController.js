import { verifyToken } from '../services/TokenService.js'

const handleAuth = (req, res, next) =>{
    const token = req.headers['authorization']
    const userId = verifyToken(token)

    if (userId) {
        req.userId = userId
        next()
    }
    else return res.status(401).json({ message: 'Unauthorized' })
}

export { handleAuth }