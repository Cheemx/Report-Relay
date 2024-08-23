import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {useFieldArray, useForm} from "react-hook-form"
import axios from "axios"
import { useDispatch } from 'react-redux'
import {create} from "../store/performanceSlice.js"
import Button from './Button.jsx'
import Input from './Input.jsx'

function CreatePerformance() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, control, handleSubmit} = useForm({
        defaultValues: {
            studentName: "",
            className: "",
            division: "",
            rollNumber: "",
            email: "",
            subjectPerformance: [
                {
                    name: "",
                    attendance: "",
                    inSem: "",
                    prelim: "",
                    remark: ""
                }
            ]
        }
    });

    const {fields, append} = useFieldArray({
        control,
        name: "subjectPerformance"
    });

    const createPerformance = async (data) => {
        try {
            const response = await axios.post(
                "https://report-relay.onrender.com/create-form",
                data,
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    withCredentials: true
                }
            )
    
            if (response.status === 201) {
                const userData = response.data
                if (userData) {
                    dispatch(create(userData))
                    navigate("/send-report")
                }
            } else {
                console.error("Creation of the performance form failed")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Performance creation failed!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-800 p-8">
        <div className="w-full max-w-5xl bg-neutral-700 rounded-xl p-10 border border-blue-800/10 mb-16">
          <h2 className="text-3xl font-bold leading-tight text-white text-center mb-8">
            Fill Student Performance Details
          </h2>
  
          <form onSubmit={handleSubmit(createPerformance)}>
            <div className="space-y-6">
              <div className="grid grid-cols-1">
                <Input
                  label="Student Name:"
                  placeholder="Enter student name"
                  {...register("studentName", { required: true })}
                  className="w-full"
                />
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Class:"
                  placeholder="Enter class name"
                  {...register("className", { required: true })}
                  className="w-full"
                />
                <Input
                  label="Division:"
                  placeholder="Enter division"
                  {...register("division", { required: true })}
                  className="w-full"
                />
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Roll Number:"
                  placeholder="Enter roll number"
                  {...register("rollNumber", { required: true })}
                  className="w-full"
                />
                <Input
                  label="Parent's Email:"
                  type="email"
                  placeholder="Enter parent's email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email address must be a valid address"
                    }
                  })}
                  className="w-full"
                />
              </div>
  
              {/* Subject Performance */}
              <h3 className="text-2xl font-bold text-white mt-8 mb-6">Subject Performance:</h3>
  
              {fields.map((item, index) => (
                <div key={item.id} className="space-y-6 mb-6">
                  {/* Subject Name and Attendance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Subject Name:"
                      placeholder="Enter subject name"
                      {...register(`subjectPerformance.${index}.name`, { required: true })}
                      className="w-full"
                    />
                  </div>
  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Input
                      label="Attendance (%):"
                      type="number"
                      placeholder="Enter attendance percentage"
                      {...register(`subjectPerformance.${index}.attendance`, { required: true })}
                      className="w-full"
                    />
                    <Input
                      label="In-Semester Marks:"
                      type="number"
                      placeholder="Enter in-semester marks"
                      {...register(`subjectPerformance.${index}.inSem`, { required: true })}
                      className="w-full"
                    />
                    <Input
                      label="Prelim Marks:"
                      type="number"
                      placeholder="Enter prelim marks"
                      {...register(`subjectPerformance.${index}.prelim`, { required: true })}
                      className="w-full"
                    />
                    <Input
                      label="Remark:"
                      placeholder="Enter remark"
                      {...register(`subjectPerformance.${index}.remark`)}
                      className="w-full"
                    />
                    <div className="grid grid-cols-1 text-center">
                      <Button
                        onClick={() =>
                          append({ name: "", attendance: "", inSem: "", prelim: "", remark: "" })
                        }
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10"
                      >
                        Add Subject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
  
              <Button
                type="submit"
              >
                Submit Performance
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default CreatePerformance