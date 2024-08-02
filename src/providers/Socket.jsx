import React, { useMemo, useContext, createContext } from 'react'
import { io } from 'socket.io-client'
import { socketUrl } from '../helper/conf'

const SocketContext= createContext(null)

export const useSocket= () =>{ return useContext(SocketContext) }

export const SocketProvider= ({children}) =>{
    const socket= useMemo(() => io(socketUrl), [])
    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}