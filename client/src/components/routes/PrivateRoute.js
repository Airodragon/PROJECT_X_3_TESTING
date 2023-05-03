import {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '../Spinner';
import { useAuth } from '../context/auth';

export default function PrivateRoute({children, ...rest}) {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth(false);

    useEffect(() => {
        const authCheck = async() => {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/user-auth`,
        {
            headers: {
                Authorization: auth?.token
        }
        
        })
        if(res.data.ok){
            setOk(true)
        }
        else{
            setOk(false)
        }
    }
    if(auth?.token) authCheck()
    },[auth?.token])

    return ok?<Outlet />:<Spinner />
}