import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Auth from './components/Auth/Main';
import Home from './components/Home/Main';
import './App.css';
import routes from './helper/routes';
import { AuthStateContext } from './state/AuthState';
import Header from './components/Header/Main';
import Profile from './components/Profile/Main';
import Messages from './components/Messages/Main';
import useTitle from './hooks/useTitle';
import { useSocket } from './providers/Socket';

const ProtectedRoute = ({isAuthRoute=false, children: destination}) => {
  const { token } = useContext(AuthStateContext)

  if (isAuthRoute) return token ? <Navigate to={routes.home}/> : destination
  return token ? destination : <Navigate to={routes.auth}/>
}

const App = () => {
  document.title = useTitle()
  const [ unrestricted, setUnrestricted ] = useState(true)

  const { userId } = useContext(AuthStateContext)
  const { socket } = useSocket()
  useEffect(() => { if (userId) socket.emit('login', { userId }) }, [userId])
  
  const location = useLocation()
  useEffect(()=>{ setUnrestricted(![routes.auth].includes(location.pathname)) }, [location])

  return (
    <div style={{ height: "100vh" }}>
      <Header unrestricted={unrestricted}/>
      <Routes>
        <Route path={routes.auth} element={<ProtectedRoute isAuthRoute><Auth/></ProtectedRoute>}></Route>
        <Route path={routes.home} element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path={routes.messages} element={<ProtectedRoute><Messages/></ProtectedRoute>}></Route>
        <Route path={routes.profile} element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App;
