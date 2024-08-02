import { Server } from 'socket.io';

const configureSocketIO = server => {
    const io = new Server(server, {
        cors: {
        origin: '*',
        }
    })

    let connectedUsers = []

    const searchIndexUser = id => { return connectedUsers.findIndex(user => user.userId == id) }
    const searchIndexSocket = id => { return connectedUsers.findIndex(user => user.socketId == id) }
    
    io.on('connection', socket =>{
        const emitToUser = (userId, event, data=null) =>{
            const index = searchIndexUser(userId)
            if (index != -1){
                const { socketId } = connectedUsers[index]
                
                let socket = io.sockets.sockets[socketId]
                if (socket) socket.emit(event, data)                  
            }
        }
        
        const refreshConnectedList = () => io.emit('connected-list', { list: connectedUsers.map(user => user.userId) })

        const disconnect = index => {
            if (index != -1) {
                connectedUsers.splice(index, 1)
                refreshConnectedList()
            }
        }
        
        socket.on('login', ({ userId }) => {
            const { id: socketId } = socket
            const index = searchIndexUser(userId)
            disconnect(index) 
            connectedUsers.push({ socketId, userId })
            refreshConnectedList()
        })
        
        socket.on('disconnect', () => {
            const index = searchIndexSocket(socket.id)
            disconnect(index) 

        }) 

        socket.on('logout', ({ userId }) => {
            const index = searchIndexUser(userId)
            disconnect(index) 
        }) 
    
        socket.on('typing-send', ({receiverId}) => emitToUser(receiverId, 'typing-receive'))
    
        socket.on('stop-typing-send', ({receiverId}) => emitToUser(receiverId, 'stop-typing-receive'))

        socket.on('message-send', ({ receiverId }) => emitToUser(receiverId, 'message-receive'))
    
    })

    return io
}

export default configureSocketIO