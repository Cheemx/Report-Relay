import React from 'react'
import {useDispatch} from "react-redux"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {logout} from "../store/authSlice.js"
import Button from './Button.jsx'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logoutHandler = async () => {
        try {
            const response = await axios.post(
                "/api/logout",
                {},
                {
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
    
            if(response.status === 200) {
                dispatch(logout())
                navigate("/")
            } else {
                console.error("Logout failed")
            }
        } catch (error) {
            console.error("An Error occurred during logout:", error)
        }
    }
    
    return (
        <Button onClick={logoutHandler}>
            Logout
        </Button>
    )
}

export default LogoutBtn