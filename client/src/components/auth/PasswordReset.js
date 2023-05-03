import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useAuth } from '../context/auth'
import './PasswordReset.css'


const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/password-reset`, {
        email,
      })
      if (res.data.success) {
        console.log("SUCCESS" + res)
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
        console.log("ERROR " + res)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.error)
    }
  }
  const currenttimeusingusingtimeout = () => {
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
      <div className="reset-password-page">
        <div className="reset-password-form">
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
          <div className='reset-password-text'>
            <p className='reset-password-text-1'>
              Reset Password
            </p>
            <p className='reset-password-text-2'>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <form className='pass-reset-form' onSubmit={handleSubmit}>
            <div className="form-group form-group-labelled">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                autoFocus
              />
              </div>
              <div className="form-group form-group-unlabelled">
                <button
                  type="submit"
                  className="btn btn-primary btn-raised btn-block submit-button"
                >
                  Submit
                </button>
              </div>
              <p className='reset-to-login'>
                            Remember Password <Link to='/login' className='link'> Back to Login</Link>
                        </p>
                        <p className='reset-to-signup'>
                            Not registered <Link to='/register' className='link'> Create an account</Link>
                        </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default PasswordReset