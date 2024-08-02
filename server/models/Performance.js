import mongoose from "mongoose"

const performanceSchema = new mongoose.Schema({
    studentName:{
        type : String, 
        required : true
    },
    class:{
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubPerformance"
        }
    ], // Array of all Subject's performances
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Performance = mongoose.model("Performance", performanceSchema)