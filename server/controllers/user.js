import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/User.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from request
     
    // check if we are able to extract the request body
    // check if the user exists
    // hash the password and push the hashed password in db model
    // if the user does not exist then put the user in the db
    // return the response to the user 
})

export {
    registerUser,
}