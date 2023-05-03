import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { Spinner } from '../Spinner'

const Logout = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth(false)
    const logout = () => {
        localStorage.removeItem('auth')
        navigate('/login')
    }
  return (
   <>
   <h1>
     
        <Spinner />
         {logout()}
   </h1>
   </>
  )
}

export default Logout
