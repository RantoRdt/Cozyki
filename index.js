import express, { json, urlencoded, static as static_ } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import routers from './routers/router.js'
import configureSocketIO from './config/socket.io-server.js'
import connectDb from './config/dbConnection.js'

dotenv.config()

const app= express()
const server = http.createServer(app)

connectDb(process.env.DATABASE_URL)
const io = configureSocketIO(server)

app.use(cors())
app.use(json())
app.use(urlencoded())
app.use(static_('assets'))

app.use('/api', routers)

const port = process.env.SERVER_PORT || 8000
server.listen(port, ()=> console.log(`Serveur démarré au port ${port}`))

const socketPort = process.env.SOCKET_PORT || 8001
io.listen(socketPort)