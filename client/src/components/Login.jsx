import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import Input from './Input.jsx'

const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const login = async (data) => {
        try {
            const response = await axios.post(
                "/api/login",
                data,
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }
            )
    
            if (response.status === 200) {
                const userData = response.data
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-neutral-700 rounded-xl p-10 border border-blue-800/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='mt-2 text-center text-2xl font-bold leading-tight text-white'>
                    Login to Report Relay!
                </h2>
                <p>
                    Don't have an Account?&nbsp;
                    <Link 
                        to="/api/register"
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label = "Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button type='submit' className='w-full'>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login