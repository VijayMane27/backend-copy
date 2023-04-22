const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    FYIT: {
        type: String,
        required:true
    },   
    SYIT: {
        type: String,
        required: true
    },
    TYIT: {
        type: String,
        required: true
    }
       
}, { timestamps: true})

module.exports = mongoose.model('Subject',SubjectSchema)