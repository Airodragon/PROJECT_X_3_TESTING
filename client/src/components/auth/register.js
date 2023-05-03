
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FaEye, FaEyeSlash, FaArrowCircleRight } from 'react-icons/fa'
import './register.css'

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
          } else if (password.length > 20) {
            toast.error('Password must be less than 20 characters long')
            return
          } else if (password.search(/\d/) === -1) {
            toast.error('Password must contain at least one number')
            return
          } else if (password.search(/[a-zA-Z]/) === -1) {
            toast.error('Password must contain at least one letter')
            return
          } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
            toast.error('Password must contain only letters, numbers and special characters')
            return
          } else if (password.search(/\s/) !== -1) {
            toast.error('Password must not contain any spaces')
            return
          } 
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
                    name,
                    email,
                    password
                })
                if (res.data.success) {
                    console.log("SUCCESS" + res)
                    toast.info("User is getting added")
                    setTimeout(() => {
                        toast.success(res.data.message)
                    }, 1000)
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500)
                } else {
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
            
            <div className='sign-page'>
                
                <div className='signupform'>
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
                    <form className='sign-form' onSubmit={handleSubmit}>
                    <div className='form-group forusername mt-3'>
                            
                            <label className='form-label' htmlFor='Username'>Your Name</label>
                                <input
                                    type='name'
                                    className='form-control'
                                    id='name'
                                    placeholder='Name'
                                    onChange={(e) => setName(e.target.value)}
                                    name='name'
                                    value={name}
                                    required
                                />
                            </div>
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
                        <div className='form-group confirmforpassword mt-3'>
                            
                        <label className='form-label' htmlFor='password'>Confirm Your Password</label>
                            <div className='password-input-wrapper'>
                            <input
                                type='password'
                                className='form-control'
                                id='confirmforpassword'
                                placeholder='Confirm Password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                name='Confirm Password'
                                value={confirmPassword}
                                required
                            />
                            <button className='btn password-shower' type='button' onClick={
                                () => {
                                    const passwordInput = document.querySelector('#confirmforpassword')
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
                            Register
                            <span>
                                <FaArrowCircleRight />
                            </span>
                            </button>
                        <p className='message not-register'>
                            Already registered? <Link to='/login' className='link'> Log In </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register