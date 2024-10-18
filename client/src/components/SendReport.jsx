import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Input from './Input'
import Button from './Button'

function SendReport() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const sendReport = async (data) => {
        try {
          const response = await axios.post(
              "/api/send-report",
              data,
              {
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
              }
          )
  
          if(response.status === 201) {
              const userData = response.data
              if (userData) {
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
                <div className='mb-2 flex flex-wrap justify-center'>
                    <h2 className='mt-2 text-center text-2xl font-bold leading-tight text-white'>
                        Send Report!
                    </h2>
                    <p>
                        Didn't create a Performance Form?&nbsp;
                        <Link
                            to="/create-form"
                            className='font-medium text-primary transition-all duration-200 hover:underline'
                        >
                            Performance
                        </Link>
                    </p>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                    <form onSubmit={handleSubmit(sendReport)}>
                        <div className='spsce-y-5'>
                            <Input
                                label = "Parent's Email:"
                                placeholder="Enter email of student's parent"
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
                                label="Subject of Email: "
                                type="text"
                                placeholder="Enter subject of your email"
                                {...register("subject", {
                                    required: true
                                })}
                            />
                            <Input
                                label="Email:  "
                                type="text"
                                placeholder="Type email..."
                                {...register("text", {
                                    required: true
                                })}
                            />

                            <Button
                                className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4'
                            >
                                Send Report
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SendReport