const express = require('express')
const {
    getAttendancesByEmail,
    createAttendance,
    getAttendances,
    getAttendance,
    deleteAttendance,
    updateAttendance
} = require('../controllers/Attendancecontroller')



const router = express.Router()

router.get('/:email', getAttendancesByEmail)

//Get all Attendance

router.get('/',  getAttendances)

//Get single Attendance

router.get('/:id',getAttendance)

//post a new Attendance

router.post('/', createAttendance)

//Delete a Attendance

router.delete('/:id', deleteAttendance)

//Update a Attendance
router.patch('/:id',updateAttendance)


module.exports = router