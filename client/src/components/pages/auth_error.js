import React from 'react'
import { Link } from 'react-router-dom'
import './auth_error.css'

const AuthError = () => {
    return (
        <>
            <div className='Container error_401'>
                <div id="main">
                    <div className="fof">
                        <h1>Error 403</h1>
                        <p>Unauthorized Access </p>
                        <div>Click here to go back to <Link to="/login" className='link-to-login' >Login </Link></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AuthError