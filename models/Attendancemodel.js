const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    email: {
        type: String,
        required:true,
        ref:'User'
    },
    date: {
        type: String,
        required: true
    },
    presentCount:{
        type: Number,
        required: true
    },
    absentCount:{
        type: Number,
        required: true
    },
    totalCount:{
        type: Number,
        required: true
    }
    
    
}, { timestamps: true})

module.exports = mongoose.model('attendance',attendanceSchema)
