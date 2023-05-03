import React from 'react'
import { Link } from 'react-router-dom'
import './auth_error.css'

const Error404 = () => {
  return (
    <>
         <div className='Container error_401'>
                <div id="main">
                    <div className="fof">
                        <h1>Error 404</h1>
                        <p>This page doesn't exist </p>
                        <div>Click here to go back to <Link to="/dashboard" className='text-primary' >Homepage</Link></div>
                    </div>
                </div>
            </div>
    
    </>
  )
}

export default Error404