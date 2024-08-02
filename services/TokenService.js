import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

const generateToken = userId => { return jwt.sign({ id: userId }, jwtSecret, { expiresIn: process.env.JWT_EXPIRATION }) }

const verifyToken = token => {
    if (!token) return null
    jwt.verify(token, jwtSecret, (err, decoded) => { return !err && decoded.id })
}

export { generateToken, verifyToken }