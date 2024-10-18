import React, { useState } from 'react'
import { Link, useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import Button from "./Button.jsx"
import Input from "./Input.jsx"
import Logo from './Logo.jsx'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "https://report-relay.onrender.com/register",
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
                    navigate("/login")
                }
            } else {
                console.error("Signup Failed")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Registration Failed")
        }
    }
    

    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-neutral-700 rounded-xl p-10 border border-blue-800/10'>
            <div className='mb-2 flex justify-center items-center'>
                <span className='inline-block w-full max-w-[100px] items-center'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className='mt-2 text-center text-2xl font-bold leading-tight text-white'>
                Sign Up to Create Account!
            </h2>
            <p>
                Already have an Account?&nbsp;
                <Link
                    to="https://report-relay.onrender.com/login"
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-5'>
                    <Input
                        label = "Name: "
                        placeholder="Enter your Name"
                        type="text"
                        {...register("name", {
                            required: true,
                        })}
                    />
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
                        Create Account
                    </Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Signup
