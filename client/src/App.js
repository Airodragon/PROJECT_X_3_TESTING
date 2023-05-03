import { Routes, Route } from 'react-router-dom';
import Register from './components/auth/register';
import Dashboard   from './components/pages/dashboard';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/ForgotPassword';
import PasswordReset from './components/auth/PasswordReset';
import AuthError from './components/pages/auth_error';
import Error404 from './components/pages/error404';
// import PaymentHome from './components/payment/paymenthome';

import './App.css';

// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/routes/PrivateRoute';
import Homepage from './components/pages/homepage';
import UserPages from './components/pages/user_pages/user_pages';

function App() {
  return (
   <>
   <Routes>
      <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="" element={<Dashboard />} />

      </Route>

      {/* FOR TESTING */}
      {/* <Route path="/spinner" element={<Spinner />} /> */}
      <Route path="/home" element={<Homepage />} />
      <Route path ="/register" element={< Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/password-reset' element={< PasswordReset />} />
      <Route path='/forgotpassword/:id/:token' element={<ForgotPassword />} />
      <Route path='/auth_error' element={<AuthError / >} />
      <Route path='/user/:id' element={<UserPages />} />
      {/* <Route path='/payment' element={<PaymentHome />} /> */}
      <Route path='*' element={<Error404/>} />

   </Routes>
   </>
  );
}

export default App;
