import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  {useParams} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'


const ForgotPassword = () => {
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()
  const {id, token} = useParams()

  const userValid = async () => {
    const data = await axios.get(`${process.env.REACT_APP_API}/api/auth/forgotpassword/${id}/${token}`)
    if (data.data.success){
      console.log("SUCCESS " + data.data.message)
      toast.success(data.data.message)
    } else{
      toast.error(data.data.message)
      console.log("ERROR " + data.data.message)
      navigate('/auth_error')
    }
  }


  useEffect(() => {
    userValid()
  }, [])

  




  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(Password.length < 6) {
        toast.error('Password must be at least 6 characters long')
        return
      } else if (Password.length > 20) {
        toast.error('Password must be less than 20 characters long')
        return
      } else if (Password.search(/\d/) === -1) {
        toast.error('Password must contain at least one number')
        return
      } else if (Password.search(/[a-zA-Z]/) === -1) {
        toast.error('Password must contain at least one letter')
        return
      } else if (Password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
        toast.error('Password must contain only letters, numbers and special characters')
        return
      } else if (Password.search(/\s/) !== -1) {
        toast.error('Password must not contain any spaces')
        return
      } 
      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/${id}/${token}`, {
        password: Password,
      })
      if (res.data.success) {
        setPassword('')
        console.log("SUCCESS" + res)
        toast.success(res.data.message)
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } else {
        toast.error(res.data.message)
        console.log("ERROR " + res)
      }
      

  } catch (error) {
  
  }
}
  


  return (
    <>
      <section className="vh-100" >
      <ToastContainer />
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-7 col-xl-7">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-12 col-lg-12 col-xl-12">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Enter your password</p>
                    <p className='text-center text-muted'>
                      Try to make it as strong as possible.
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">

                          <label className="form-label" htmlFor="password" >Your Password</label>
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            value={Password}
                            required />
                        </div>
                      </div>


                      <div className="d-flex justify-content-evenly mb-2 mb-lg-4">
                        <button type="Submit" className="btn btn-danger">Reset</button>
                      </div>

                      <div className="d-flex justify-content-center links">
                        Go back to <Link to="/login" className="text-primary px-2 "
                          // APPLY STYLING TO THIS LINK

                          style={
                            {
                              textDecoration: 'none',
                            }

                          }

                        >login</Link>
                      </div>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default ForgotPassword