import { Router } from "express";
import{
    homeHandler,
    registerUser,
    loginUser
} from "../controllers/user.js";

const router = Router()

router.route("/").get(homeHandler)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

export default router