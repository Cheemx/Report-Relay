import { Router } from "express";
import{
    homeHandler,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    forgetPassword
} from "../controllers/user.js";
import{
    createPerformanceForm,
    sendPerformanceEmail
} from "../controllers/performance.js"
import { verifyJWT } from "../middlewares/auth.js"

const router = Router()

router.route("/").get(homeHandler)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// Secured Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)
router.route("/change-pass").post(verifyJWT, changePassword)
// to create forgetPassword route you'll have to create another route that'll be sendOTP route that we'll create once all other controllers are created!!!
router.route("/forget-pass").post(forgetPassword)
router.route("/create-form").post(verifyJWT, createPerformanceForm)
router.route("/send-report").post(verifyJWT, sendPerformanceEmail)

export default router