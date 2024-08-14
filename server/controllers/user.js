import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/User.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh tokens")
    }
}

const homeHandler = asyncHandler(async (req, res) => {
    try {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,{},`<h1>Welcome to Homepage</h1>`
            )
        )
    } catch (error) {
        throw new ApiError(401, "Didn't reach homepage")
    }
})

const registerUser = asyncHandler(async (req, res) => {
    try {
        // get user details from request
        const {name, email, password} = req.body
    
        // check if we are able to extract the request body
        if (
            [name, email, password].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }
    
        // check if the user exists
        const existingUser = await User.findOne({email})
    
        if(existingUser) {
            throw new ApiError(409, "The User already exists")
        }
    
        // if the user does not exist then put the user in the db
        const user = await User.create({
            name,
            email,
            password
        })
    
        // remove password and refresh token field from the response
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        // check if the user is created 
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }
    
        // return the response to the user
        return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully!")
        )
    } catch (error) {
        throw new ApiError(400, "Error ehile registering the user", error);
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        // take the email and password from request body
        const {email, password} = req.body

        if (!email || !password) {
            throw new ApiError(400, "All fields are necessary!")
        }

        // check if the user exists in the db return error if not
        const user = await User.findOne({email})

        if(!user){
            throw new ApiError(404, "User does not exist!")
        }

        // if the user exists match the passwords if it matches authorize user and if it does not throw error
        const isPassValid = await user.isPassCorrect(password)

        if (!isPassValid) {
            throw new ApiError(401, "Invalid User credentials")
        }

        // provide user a refresh token after each peiodic interval
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

        // set cookie option and catch loggedInUser
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        // return the login response if successful
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in Successfully!"
            )
        )
    } catch (error) {
        throw new ApiError(400, "Error while logging in the user", error);
    }
})

export {
    homeHandler,
    registerUser,
    loginUser
}