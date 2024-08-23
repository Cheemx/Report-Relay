import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/User.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"

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
        .status(200)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully!")
        )
    } catch (error) {
        throw new ApiError(400, "Error while registering the user", error);
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
            secure: true,
            sameSite: 'None'
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

const logoutUser = asyncHandler(async (req, res) => {
    // get current user from auth middleware
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1 // this removes the refreshToken field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Access tokens grant access to protected resources, while refresh tokens are used to get new access tokens when the current one expires
    // Refresh tokens are issued alongside access tokens and when the current access token expires, refresh tokens are used to provide another access token.

    // This function is to do the same task i.e. to refresh the expiring Access token.

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is Expired or Used")
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                "Access Token Refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }

})

const changePassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} =req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPassCorrect(oldPassword)
    if(!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password")
    }

    user.password = newPassword

    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(
        200, 
        {},
        "Password Changed Successfully"
    ))
})

    // to create forgetPassword route you'll have to create another route that'll be sendOTP route that we'll create once all other controllers are created!!!
const forgetPassword = asyncHandler(async (req, res) => {
    // Get the user's email and check existence
    // verify the genuineness by sending an OTP on email ?
    // match the OTP 
})

export {
    homeHandler,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    forgetPassword
}