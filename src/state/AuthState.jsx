import React, { createContext, useEffect, useState } from 'react';
import { storageName } from '../helper/conf';
import { jwtDecode } from "jwt-decode"

const name = storageName.auth
const AuthStateContext = createContext(false)

const AuthStateProvider = ({children}) => {
    const storageVal = localStorage.getItem(name)
    const [ state, setState ] = useState((storageVal != 'null') ? storageVal : null)
    const [ userId, setUserId ] = useState(null)

    useEffect(()=>{
        try {
            const { id } = jwtDecode(state)
            setUserId(id)
        }
        catch (error) { setUserId(null) }
    }, [state])

    const setAuthenticated = (token=undefined) =>{
        if (token){
            localStorage.setItem(name, token)
            setState(token)
        }
        else {
            localStorage.removeItem(name)
            setState(null)
        }

    }
    return (
        <AuthStateContext.Provider value={{
            userId,
            token: state,
            setAuthenticated,
            setDisconnected: () => setAuthenticated()
        }}>
            {children}
        </AuthStateContext.Provider>
    )
}
export {AuthStateContext, AuthStateProvider}
