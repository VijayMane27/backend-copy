const Schedule = require('../models/schedulemodel')
const mongoose = require('mongoose')


const getSchedulesByEmail = async(req, res) =>{
  const {email} = req.params
  
  const scheduleByEmail = await Schedule.find({email})
  
  if (!scheduleByEmail){
      return res.status(400).json({ error: 'No such schedule'})
  }
  
  res.status(200).json(scheduleByEmail)
  
  }
  
//get all schedule
const getSchedules = async (req,res) => {
    const schedule = await Schedule.find({}).sort({createdAt: -1})
   // .populate({ path:'email',select:['email']})

    res.status(200).json(schedule)
}

// get a single schedule

const getSchedule = async(req, res) =>{
const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such schedule' })
}

const schedule = await Schedule.findById(id)
.populate({ path:'email',select:['email']})

if (!schedule){
    return res.status(400).json({ error: 'No such schedule'})
}

res.status(200).json(schedule)

}
//create a new schedule

const createShcedule = async (req , res) => {
    const { email,date,className,timeFrom, course, timeTo,notes} = req.body

    console.log(req.body);
   
    let emptyFields = []
    if (!email) {
      emptyFields.push('email')
    }
  if (!date) {
    emptyFields.push('date')
  }
  if (!className) {
    emptyFields.push('className')
  }
  if (!timeFrom) {
    emptyFields.push('timeFrom')
  }
  if (!timeTo) {
    emptyFields.push('timeTo')
  }
  if (!course) {
    emptyFields.push('course')
  }
  if (!notes) {
    emptyFields.push('notes')
  }
  if (emptyFields.length > 0) {
    console.log("Empty Fields" , error.message);
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

    //add doc to db

    try{
    const schedule = await Schedule.create({email,date,className,timeFrom,course, timeTo, notes })
    res.status(200).json(schedule)
    }catch(error){
       res.status(400).json({error: error.message})
       console.log(error.message);
    }
}


//delete a schedule

const deleteSchedule = async(req, res) => {

    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such schedule' })
}

    const schedule = await Schedule.findOneAndDelete({_id: id})

    if (!schedule){
        return res.status(400).json({ error: 'No such schedule'})
    }

    res.status(200).json(schedule)
}

// update a schedule

const updateSchedule = async (req, res) => {

    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such schedule' })
}

const schedule = await Schedule.findOneAndUpdate({_id: id}, {

    ...req.body

})

if (!schedule){
    return res.status(400).json({ error: 'No such schedule'})
}

res.status(200).json(schedule)

}

module.exports ={
    getSchedulesByEmail,
    getSchedules,
    getSchedule,
    createShcedule,
    deleteSchedule,
    updateSchedule
}