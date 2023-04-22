const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    NAME: {
        type: String,
        required:true
    },
    Class:{
        type:String,
        required:true
    }       
}, { timestamps: true})

module.exports = mongoose.model('Subject',SubjectSchema)