import mongoose from "mongoose"

const subPerformanceSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    attendance:{
        type : Number,
        default : 0, 
        required : true
    },
    inSem: {
        type : Number, 
        default : 0, 
        required : true
    },
    prelim:{
        type : Number, 
        default : 0, 
        required : true
    },
    remark: {
        type : String,
    }
})

const performanceSchema = new mongoose.Schema({
    studentName:{
        type : String, 
        required : true
    },
    className:{
        type : String,
        required : true
    },
    division:{
        type : String, 
        required : true
    },
    rollNumber:{
        type : String, 
        required : true
    },
    email:{
        type : String, 
        required : true
    },
    subjectPerformance:[
        {
            type: subPerformanceSchema,
        }
    ], // Array of all Subject's performances
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Performance = mongoose.model("Performance", performanceSchema)