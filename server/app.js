import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes

import router from "./routes/user.js"

app.use("/", router)
export {app}