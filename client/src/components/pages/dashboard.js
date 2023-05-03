import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import { Link, Redirect, useHistory, useNavigate } from 'react-router-dom';
import { FiSettings, FiLogOut } from "react-icons/fi";
import { TbRecharging } from "react-icons/tb";
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
// import {}

import './dashboard.css'


const Dashboard = () => {
  // let { user } = useAuth();
  let [session, setSession] = useState(0)
  let [user_id, setUserId] = useState(0)
  function getusersessionleft() {
    let user = JSON.parse(localStorage.getItem('auth'))
    // let taskbar_top_center = document.getElementById('taskbar-top-center')
    // taskbar_top_center.style.display = 'none'
    if (user) {
      let parse_data = JSON.parse(user)
      console.log(parse_data.user.id)
      setUserId(parse_data.user.id)

      let res = axios.get(`${process.env.REACT_APP_API}/api/auth/usersessionleft/${parse_data.user.id}`)
        .then(res => {
          console.log(res.data)
          if (res.data.success) {
            // toast.success(res.data.message)
          }
          else {
            toast.error(res.data.message)
          }
          setSession(res.data.user_session)
        })
        .catch(err => {
          console.log(err)
          setSession(0)
          toast.error(err.response.data.error)
        })
    }
    else {
      console.log('no user')
      return -1
      // navigate('/login')
    }
    // taskbar_top_center.style.display = 'block'

  }

  useEffect(() => {
    getusersessionleft()
  }, [])


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
  function sessiondeducation(e) {
    // var user = JSON.parse(localStorage.getItem('auth'))
    // let parse_data = JSON.parse(user)
    // let user_id = parse_data.user.id
    let res = axios.get(`${process.env.REACT_APP_API}/api/auth/sessiondeduction/${user_id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          toast.success(res.data.message)
          console.log(e.target.id)
          let res2 = axios.post('http://localhost:9000/api/docserve',{
            id : e.target.id
          }).then(res2 => {
            console.log(res2.data)
          })
        }
        else {
          toast.error(res.data.message)
          let dashboard_modal_rechrage = document.querySelector('.dashboard-modal-recharge-cont');
          dashboard_modal_rechrage.style.display = 'block'
        }
        setSession(res.data.user_session)
      })
      .catch(err => {
        console.log(err)
        setSession(0)
        toast.error(err.response.data.error)
      })
  }

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
  // if (session === 0) {
  //   return (
  //     <>
  //       < ToastContainer />

  //       <div className="dashboard-home-cont session-expired">

  //         <div className="taskbar-top-cont px-3 session-expired">
  //           <div className="taskbar-top-left " id='clock'>
  //             {/* <Link to='/logout'>
  //               <button className='btn-inv'  >
  //                 <FiLogOut className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Logout" />
  //                 <span>
  //                   Logout
  //                 </span>

  //               </button>
  //             </Link> */}

  //             <button className='btn-inv' onClick={initiate_payment} >
  //               {/* <TbRecharging className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Recharge"  /> */}
  //               <span>
  //                 Recharge
  //               </span>
  //             </button>

  //           </div>
  //           {/* <div className='taskbar-top-center' id="taskbar-top-center">
  //       <div className='session-left'>
  //           <Link to= {`/user/${user_id}`}>
  //             <button className='btn-inv' > */}
  //           {/* <FaUserCircle className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Profile" /> */}
  //           {/* <span>
  //               Profile
  //               </span>
  //             </button>
  //           </Link>
  //         </div>
  //       </div> */}
  //           <div className='taskbar-top-center'>
  //             {currenttimeusingusingtimeout()}
  //           </div>
  //           <div className='taskbar-top-right' id="taskbar-top-center">
  //             <div className='session-left'>
  //               <Link to={`/user/${user_id}`}>
  //                 <button className='btn-inv' >
  //                   <FaUserCircle className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Profile" />
  //                   <span>
  //                     Profile
  //                   </span>
  //                 </button>
  //               </Link>
  //             </div>
  //           </div>

  //         </div>
  //         <div className='dashboard-body-cont session-expired'>
  //           <div className='dashboard-payment-alert'>
  //             <span type='button' data-bs-toggle="tooltip" data-bs-placement="top" title="Payment alert">
  //               ?
  //             </span>
  //           </div>
  //           <h3 className='mx-3 mt-4'>
  //             Message from Project X
  //           </h3>
  //           <div className='mx-3 mt-4'>
  //             <p className='text-center'>
  //               Your session has expired
  //             </p>
  //           </div>
  //           <div className='mx-3 mt-4'>
  //             <button className='btn btn-primary px-4' onClick={initiate_payment} >
  //               Pay Here
  //             </button>
  //           </div>
  //           {/* <div className='mx-3 mt-4'>
  //           <p className='text-center'>
  //               Thank you
  //           </p>
  //         </div> */}

  //         </div>

  //       </div>
  //     </>
  //   )
  // }
  // else {

  return (
    <>
      <div className="dashboard-modal-recharge-cont">
      <div className='dashboard-modal-recharge'>
        <div className='dashboard-payment-alert'>
          <span type='button' data-bs-toggle="tooltip" data-bs-placement="top" title="Payment alert" onClick={
            () => {
              // let dashboard_modal_rechrage = document.querySelector('.dashboard-modal-recharge');
              let dashboard_modal_rechrage_cont = document.querySelector('.dashboard-modal-recharge-cont');
              // dashboard_modal_rechrage.style.display = 'none'
              dashboard_modal_rechrage_cont.style.display = 'none'
            }
          }>   X
          </span>
        </div>
        <h3 className='mx-3 mt-4'>
          Message from Project X
        </h3>
        <div className='mx-3 mt-4'>
          <p className='text-center'>
            Your session has expired
          </p>

        </div>
        <div className='mx-3 mt-4'>
          <button className='btn btn-primary px-4' onClick={initiate_payment} >
            Pay Here
          </button>
        </div>
      </div>
      </div>

      < ToastContainer />
      <div className="dashboard-home-cont session-expired">

        <div className="taskbar-top-cont px-3 session-expired">
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
              <Link to={`/user/${user_id}`}>
                <button className='btn-inv' >
                  <FaUserCircle className='logout-icon ' data-toggle="tooltip" data-placement="bottom" title="Profile" />
                  <span>
                    Profile
                  </span>
                </button>
              </Link>
            </div>
          </div>

        </div>

        <div className="dashboard-body-cont image-container">
          <div className='account-using'>
            <p className='account-using-text'>
              PROJECT X
            </p>
          </div>
          <div className='container mt-2'>
            <div className="row">
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation} id='1'>
                  <div className="card image-card"  id='1'>
                    <div className="card-block"  id='1'>
                      <div className='image-card-header'  id='1'>
                        <h6 className="m-b-20"  id='1'>Production</h6>
                        <h3 className="text-right"  id='1'><span  id='1'>Ubuntu</span></h3>
                      </div>
                      <img src={require('../../assets/images/ubuntu.png')} alt='ubuntu-icon'  id='1' / >
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation}>
                  <div className="card image-card">
                    <div className="card-block">
                      <div className='image-card-header'>
                        <h6 className="m-b-20">Utility</h6>
                        <h3 className="text-right"><span>Chrome</span></h3>
                      </div>
                      <img src={require('../../assets/images/chrome.png')} alt='ubuntu-icon' />
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation}>
                  <div className="card image-card">
                    <div className="card-block">
                      <div className='image-card-header'>
                        <h6 className="m-b-20">Utility</h6>
                        <h3 className="text-right"><span>Firefox</span></h3>
                      </div>
                      <img src={require('../../assets/images/firefox.png')} alt='ubuntu-icon' />
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation}>
                  <div className="card image-card">
                    <div className="card-block">
                      <div className='image-card-header'>
                        <h6 className="m-b-20">Production</h6>
                        <h3 className="text-right"><span>Gimp</span></h3>
                      </div>
                      <img src={require('../../assets/images/gimp.png')} alt='ubuntu-icon' />
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation}>
                  <div className="card image-card">
                    <div className="card-block">
                      <div className='image-card-header'>
                        <h6 className="m-b-20">Communication</h6>
                        <h3 className="text-right"><span>Teams</span></h3>
                      </div>
                      <img src={require('../../assets/images/teams.png')} alt='ubuntu-icon' />
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation}>
                  <div className="card image-card">
                    <div className="card-block">
                      <div className='image-card-header'>
                        <h6 className="m-b-20">Communication</h6>
                        <h3 className="text-right"><span>Telegram</span></h3>
                      </div>
                      <img src={require('../../assets/images/telegram.png')} alt='ubuntu-icon' />
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation}>
                  <div className="card image-card">
                    <div className="card-block">
                      <div className='image-card-header'>
                        <h6 className="m-b-20">Production</h6>
                        <h3 className="text-right"><span>Alpine</span></h3>
                      </div>
                      <img src={require('../../assets/images/ubuntu_dark.png')} alt='ubuntu-icon' />
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-3 col-sm-6 col-md-6 col-6 col-lg-3 mt-2">
                <button className='card-image-button' onClick={sessiondeducation}>
                  <div className="card image-card">
                    <div className="card-block">
                      <div className='image-card-header'>
                        <h6 className="m-b-20">Entertainment</h6>
                        <h3 className="text-right"><span>VLC</span></h3>
                      </div>
                      <img src={require('../../assets/images/vlc.png')} alt='ubuntu-icon' />
                    </div>
                  </div>
                </button>
              </div>


            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;