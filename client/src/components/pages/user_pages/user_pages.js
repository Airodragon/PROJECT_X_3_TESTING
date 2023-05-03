import React, { useEffect, useState } from 'react'
import './user_pages.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { FaTimes, FaMinus, FaUserCircle, FaHome } from 'react-icons/fa'
import { FiSettings, FiLogOut, FiMaximize2 } from "react-icons/fi";
import { TbRecharging } from "react-icons/tb";
import {GrFormClose} from "react-icons/gr";
import {MdMinimize} from "react-icons/md";



const UserPages = () => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userSession, setUserSession] = useState()
    const navigate = useNavigate()
    // const [Loading, setLoading] = useState(-1)
    let count = 1

    function convertGMTtoIST(gmtTime) {
        // Create a new Date object from the GMT time string
        const date = new Date(gmtTime);

        // Set the time zone to Indian Standard Time (IST)
        date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000));

        // Return the new time in IST format
        return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    }

    async function GetUserInfo() {
        toast.info('Fetching your information')
        var user = JSON.parse(localStorage.getItem('auth'))
        if (!user) {
            toast.error('You are not logged in')
            toast.error('Redirecting to Login')
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
        console.log(user)
        let parse_data = JSON.parse(user)
        let user_email = parse_data.user.email
        console.log(user_email)
        let user_id = parse_data.user.id
        let res = await axios.get(`${process.env.REACT_APP_API}/api/auth/user/${user_id}`)
        console.log(res.data)
        let payment_array = res.data.payment
        console.log(payment_array)
        let payment_array_length = payment_array.length
        console.log(payment_array_length)


        for (let i = 1; i < payment_array_length; i++) {
            let create_tr = document.createElement('tr')
            create_tr.setAttribute(
                'className', 'text-center'
            )
            // console.log(payment_array[count])
            try {
                create_tr.innerHTML = `
            <td>${count}</td>
            <td>${(payment_array[count].date).slice(0, 10)}</td>
            <td>${payment_array[count].amount}</td>
            `
                document.getElementById('payment_table').appendChild(create_tr)
                count++
            }
            catch (err) {
                console.log(err)
            }
        }
        for (let i = 0; i < payment_array_length; i++) {
            if (payment_array[i].status === 'success') {
            }
        }

        if (res.data.success === true) {
            setUserEmail(res.data.email)
            setUserName(res.data.name)
            setUserSession(res.data.user_session)
            console.log(res.data.email)
            console.log(res.data.name)
            console.log(res.data.user_session)
            toast.success("Your information has been fetched successfully")
            // setLoading(1)
        }
        else {
            console.log(res.data.message)
            toast.error("There was an error fetching your information")
            toast.error("Redirecting to Dashboard")
            setTimeout(() => {
                navigate('/dashboard')
            }, 3000)
            // setLoading(0)
        }

    }
    let [user_id, setUserId] = useState(0)

    async function initiate_payment() {
        var user = JSON.parse(localStorage.getItem('auth'))
        let parse_data = JSON.parse(user)
        let user_email = parse_data.user.email
        let user_id = parse_data.user.id
        console.log("MAIL ID -->" + user_email)
        console.log("USER ID --> " + user_id)
        let { data: { key } } = await axios.get(`${process.env.REACT_APP_API}/api/payment/r_key`)
        console.log(key)
        let { data: { order } } = await axios.post(`${process.env.REACT_APP_API}/api/payment/ordercreation`,
            {
                user_id,
            })
        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Project X",
            order_id: order.id,
            callback_url: `${process.env.REACT_APP_API}/api/payment/paymentverification/${user_id}`,
            prefill: {
                name: user_id,
                email: user_email,
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#000025",
            }

        }
        const razor = new window.Razorpay(options);
        try {
            razor.open();
        }
        catch (err) {
            console.log(err)
        }
        // razor.open();

    }

    useEffect(() => {
        GetUserInfo()
    }, [])
    function currenttimeusingusingtimeout() {
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
    function updateTime(k) {
        if (k < 10) {
            return "0" + k;
        }
        else {
            return k;
        }
    }
    return (
        <>
            {/* {toast.info('Please wait while we fetch your information')} */}
            <ToastContainer />

            <div className="user-profile">
                <div className="user-profile-top">
                    <div className="taskbar-top-cont px-3">
                        <div className="taskbar-top-left " id='clock'>
                            {/* <Link to='/logout'>
                <button className='btn-inv'  >
                  <FiLogOut className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Logout" />
                  <span>
                    Logout
                  </span>

                </button>
              </Link> */}

                            <button className='btn-inv' onClick={initiate_payment} >
                                {/* <TbRecharging className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Recharge"  /> */}
                                <span>
                                    Recharge
                                </span>
                            </button>

                        </div>
                        {/* <div className='taskbar-top-center' id="taskbar-top-center">
            <div className='session-left'>
                <Link to= {`/user/${user_id}`}>
                <button className='btn-inv' > */}
                        {/* <FaUserCircle className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Profile" /> */}
                        {/* <span>
                    Profile
                    </span>
                </button>
                </Link>
            </div>
            </div> */}
                        <div className='taskbar-top-center'>
                            {currenttimeusingusingtimeout()}
                        </div>
                        <div className='taskbar-top-right' id="taskbar-top-center">
                            <div className='session-left'>
                                <Link to='/dashboard'>
                                    <button className='btn-inv' >
                                        <FaHome className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="DashBoard" />
                                        <span>
                                            Home
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="main-body">
                    {/* <div className="application-header">

                    </div> */}
                    <div className="row">
                        <div className="application-header">
                            <div className="icons">
                                <div className="close-icon">
                                    {/* <GrFormClose />   */}
                                </div>
                                <div className="minimize-icon">
                                    {/* <MdMinimize/> */}
                                </div>
                                <div className="maximize-icon">
                                    {/* <FiMaximize2/> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                                        <div className="mt-3 mb-3">
                                            <h4 className='user-name'>
                                                {userName}
                                            </h4>
                                            {/* <p className="text-secondary mb-1">Full Stack Developer</p>
                                            <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p> */}
                                            <button className="btn btn-danger mx-2 mt-2">
                                                <Link to="/dashboard" className="text-white"
                                                    style={
                                                        {
                                                            textDecoration: 'none',
                                                        }
                                                    }>
                                                    Dashboard
                                                </Link>
                                            </button>
                                            <button className="btn btn-warning mx-2 mt-2">
                                                <Link to="/logout" style={
                                                    {
                                                        textDecoration: 'none',
                                                        color: 'white'
                                                    }
                                                }>
                                                    Logout
                                                </Link>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card mb-3">
                                    <div className="card-body">


                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h6 className="mb-0">Session Left : <span className='mx-2'>  {userSession} </span>
                                                </h6>
                                            </div>
                                        </div>
                                        <br />



                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h6 className="mb-0">Email ID :  <span className='mx-2'>  {userEmail} </span>


                                                </h6>


                                            </div>
                                        </div>
                                        <br />

                                        {/* <div className="row">
                                            <div className="col-sm-6">
                                                <h6 className="mb-0 text-center">Phone Number : </h6>
                                            </div>
                                            <div className="col-sm-6 text-secondary">
                                                {userPhone}
                                            </div>
                                        </div>
                                        <br /> */}



                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <div class="table-wrapper-scroll-y my-custom-scrollbar">

                                    <table class="table table-bordered table-dark table-striped mb-0">
                                        <thead>
                                            <tr className='text-center'>
                                                <th scope="col">
                                                    Payment ID
                                                </th>
                                                <th scope="col">
                                                    Payment Date
                                                </th>
                                                <th scope="col">
                                                    Payment Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id='payment_table' className='text-center'>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default UserPages