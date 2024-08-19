import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { sendEmailWithAttachment } from "../utils/mailSender.js";
import { Performance } from "../models/Performance.js";
import { User } from "../models/User.js";
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path";

const createPerformanceForm = asyncHandler(async (req, res) => {
    try {
        // check if the user is logged in, if not throw error
        // we will get the user from verifyJWT middleware
        const userId = req.user._id
        
        if (!userId) {
            throw new ApiError(401, "Unauthorized Access! make sure you're logged in")
        }
    
        // get the performance form data from request body
        const {studentName, className, division, rollNumber, email, subjectPerformance, createdBy} = req.body
    
        if(
            [studentName, className, division, rollNumber, email, createdBy].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are necessary.")
        }

        // check if the array of performance of subjects is empty or not
        if (subjectPerformance.length == 0) {
            throw new ApiError(401, "Performances of subjects not found")
        }
    
        // If accessed all performance data put it in the db
        const studPerformance = await Performance.create({
            studentName,
            className,
            division,
            rollNumber,
            email,
            subjectPerformance,
            createdBy: userId
        })
    
        if (!studPerformance) {
            throw new ApiError(405, "Error while creating the performance form.")
        }
    
        // return response of successful creation of the performance form.
        return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                studPerformance,
                "Performance form hosted Successfully!"
            )
        )
    } catch (error) {
        throw new ApiError(
            400,
            "Unable to host performance form",
            error
        )
    }
})

const updatePerformanceForm = asyncHandler(async (req, res) => {
    // get the performance form by studentName
    // update the required field and save them
    // return the response of changes.
})

const deletePerformanceForm = asyncHandler(async (req, res) => {
    // 
})

const sendPerformanceEmail = asyncHandler(async (req, res) => {
    try {
        // check if it is an authorized attempt to access the route
        const userId = req.user._id

        if (!userId) {
            throw new ApiError(400, "Not an verified User")
        }

        // check if the user exists in the db
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(401, "Unauthorized Access")
        }
        // getting off the email of student, subject of email and text of email from request body.
        const {email, subject, text} = req.body
    
        if (
            [email, subject, text].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(401, "All fields are mandatory")
        }
    
        // checking if the performance form exists for given student or not.
        const performanceData = await Performance.findOne({email})
    
        if(!performanceData) {
            throw new ApiError(404, "Performance data not found for specified email!")
        }
        if (performanceData.subjectPerformance.length === 0) {
            throw new ApiError(403, "Empty performance form can't be sent!")
        }
    
        // extracting the performance data from db to create the report.
        const reportData = performanceData.subjectPerformance
        const { studentName, className, division, rollNumber } = performanceData
    
        if (
            reportData.length === 0 
            || 
            [studentName, className, division, rollNumber].some(field => field?.trim() === "")
        ) {
            throw new ApiError(404, "Error while extracting performance data from db")
        }
    
        // Creating the document using pdfkit
        const doc = new PDFDocument()
        const publicDir = path.join('controllers','../public')  
        if (!fs.existsSync(publicDir)) {
            fs.mkdir(publicDir, { recursive: true})
        }
        const pdfFilePath = path.join(publicDir, `performanceReport_${studentName}.pdf`)
        doc.pipe(fs.createWriteStream(pdfFilePath))
    
        // Adding personal Information
        doc.text(`Name of the Student: ${studentName}`)
        doc.text(`Class: ${className}`)
        doc.text(`Division: ${division}`)
        doc.text(`Roll Number: ${rollNumber}`)
        doc.moveDown()
    
        // Table Headers
        doc.text('Subject', 50, 120)
        doc.text('Attendance', 150, 120)
        doc.text('InSem', 250, 120)
        doc.text('Prelim', 350, 120)
        doc.text('Remark', 450, 120)   

        let y = 150 // Initial position of y
        // adding performance data for each subject
        reportData.forEach(subject => {
            doc.text(subject.name || '', 50, y)
            doc.text(subject.attendance?.toString() || '', 150, y)
            doc.text(subject.inSem?.toString() || '', 250, y)
            doc.text(subject.prelim?.toString() || '', 350, y)
            doc.text(subject.remark || '', 450, y)

            y += 20
        })
    
        doc.end();
    
        const sentEmail = await sendEmailWithAttachment(email, subject, text, pdfFilePath)
                
        fs.unlinkSync(pdfFilePath)
                
        return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                sentEmail,
                "Performance Report sent successfully!"
            )
        )
    } catch (error) {
        throw error
    }
})

export{
    createPerformanceForm,
    updatePerformanceForm,
    deletePerformanceForm,
    sendPerformanceEmail
}