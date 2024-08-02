import mongoose from "mongoose";

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

export const SubPerformance = mongoose.model("SubPerformance", subPerformanceSchema)