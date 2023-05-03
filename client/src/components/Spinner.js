import React, {useEffect, useState} from 'react'
import './spinner.css'
import { useNavigate } from 'react-router-dom'

export const Spinner = () => {
    const [count , setCount] = useState(3)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue)=> --prevValue)
        }, 100);
        count === 0 && navigate('/login')
        return () => clearInterval(interval);
    }, [count,navigate])

    return (
        <>
            <div className="spinner-body">
                <h1 className="text-center text-light">
                    Redirecting you in {count} seconds
                </h1>
                <div className="spinner-box">
                    <div className="blue-orbit leo">
                    </div>
                    <div className="green-orbit leo">
                    </div>
                    <div className="red-orbit leo">
                    </div>
                    <div className="white-orbit w1 leo">
                    </div><div className="white-orbit w2 leo">
                    </div><div className="white-orbit w3 leo">
                    </div>
                </div>
            </div>

        </>
    )
}
