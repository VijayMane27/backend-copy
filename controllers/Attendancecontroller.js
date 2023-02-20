const Attendance = require('../models/Attendancemodel')
const mongoose = require('mongoose')

const getAttendancesByEmail = async(req, res) =>{
  const {email} = req.params
  
  const attendanceByEmail = await Attendance.find({email})
  
  if (!attendanceByEmail){
      return res.status(400).json({ error: 'No such attendance'})
  }
  
  res.status(200).json(attendanceByEmail)
  
  }
  
//get all attendance
const getAttendances = async (req,res) => {
    const attendance = await Attendance.find({}).sort({createdAt: -1})
    // .populate({ path:'email',select:['email']})
    res.status(200).json(attendance)
}

// get a single attendance

const getAttendance = async(req, res) =>{
const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such attendance' })
}

const attendance = await Attendance.findById(id)
 .populate({ path:'email',select:['email']})

if (!attendance){
    return res.status(400).json({ error: 'No such attendance'})
}

res.status(200).json(attendance)

}
//create a new attendance

const createAttendance = async (req , res) => {
    const {email,date,presentCount,absentCount,totalCount } = req.body

    let emptyFields = []
    if (!email) {
        emptyFields.push('email')
      }
    if (!date) {
      emptyFields.push('date')
    }
    if (!presentCount) {
      emptyFields.push('presentCount')
    }
    if (!absentCount) {
      emptyFields.push('absentCount')
    }
    if (!totalCount) {
      emptyFields.push('totalCount')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    //add doc to db

    try{
    const attendance = await Attendance.create({ email,date,presentCount,absentCount,totalCount })
    res.status(200).json(attendance)
    }catch(error){
       res.status(400).json({error: error.message})
    }
}


//delete a attendance

const deleteAttendance = async(req, res) => {

    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such attendance' })
}

    const attendance = await Attendance.findOneAndDelete({_id: id})

    if (!attendance){
        return res.status(400).json({ error: 'No such attendance'})
    }

    res.status(200).json(attendance)
}

// update a attendance

const updateAttendance = async (req, res) => {

    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such attendance' })
}

const attendance = await Attendance.findOneAndUpdate({_id: id}, {

    ...req.body

})

if (!attendance){
    return res.status(400).json({ error: 'No such attendance'})
}

res.status(200).json(attendance)

}

module.exports ={
    getAttendancesByEmail,
    getAttendances,
    getAttendance,
    createAttendance,
    deleteAttendance,
    updateAttendance
}