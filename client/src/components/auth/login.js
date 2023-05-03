
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useAuth } from '../context/auth'
import './login.css'
import { FaEye, FaEyeSlash, FaArrowCircleRight } from 'react-icons/fa'

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {
                email,
                password,
            })
            if (res.data.success) {
                console.log("SUCCESS" + res)
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(JSON.stringify({
                    user: res.data.user,
                    token: res.data.token,
                })))
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            } else{
                toast.error(res.data.message)
                console.log("ERROR " + res)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.error)
        }
    }


        const currenttimeusingusingtimeout= () => {
            var date = new Date();
            var hour = date.getHours();
            var min = date.getMinutes();
            var midday = "AM";
            midday = (hour >= 12) ? "PM" : "AM";
            hour = (hour === 0) ? 12 : ((hour > 12) ? (hour - 12) : hour);
            hour = updateTime(hour);
            min = updateTime(min);
            // sec = updateTime(sec);
            let x = hour + " : " + min + " " + midday;
            setTimeout(currenttimeusingusingtimeout, 1000);
            return x
          }
          const updateTime = (k) => {
            if (k < 10) {
                return "0" + k;
            }
            else {
                return k;
            }
        }

    return (
        <>
            <ToastContainer />
            

            <div className='login-page'>
                
                <div className='form'>
                {/* <h3 className='login-heading'>
                    Log In
                </h3> */}

                <div className='account-using'>
                    <p className='account-using-text'>
                        PROJECT X
                    </p>
                </div>
                <div className='time-show-wrapper'>
                    <p className='time-show'>
                        {currenttimeusingusingtimeout()}
                    </p>
                </div>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className='form-group foremail mt-3'>
                            
                        <label className='form-label' htmlFor='email'>Your Email</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                value={email}
                                required
                            />
                        </div>
                        <div className='form-group forpassword mt-3'>
                            
                        <label className='form-label' htmlFor='password'>Your Password</label>
                            <div className='password-input-wrapper'>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                value={password}
                                required
                            />
                            <button className='btn password-shower' type='button' onClick={
                                () => {
                                    const passwordInput = document.querySelector('#password')
                                    // const passwordShower = document.querySelector('.password-shower')
                                    if (passwordInput.type === 'password') {
                                        passwordInput.type = 'text'
                                        // passwordShower.innerHTML = '<FaEyeSlash />'
                                    } else {
                                        passwordInput.type = 'password'
                                        // passwordShower.innerHTML = '<FaEye />'
                                    }
                                }
                            }>
                                <FaEye  />    
                            </button>
                            </div>
                        </div>
                        <button className='btn btn-primary btn-block submit-button mt-3' type='submit'>
                            Log In
                            <span>
                                <FaArrowCircleRight />
                            </span>
                            </button>
                        <p className='message not-register'>
                            Not registered? <Link to='/register' className='link'> Create an account</Link>
                        </p>
                        <p className='message forgot-password'>
                            Forgot your password? <Link to='/password-reset' className='link'> Reset Password</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LogIn