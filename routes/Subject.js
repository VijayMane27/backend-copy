const express = require('express')
const {
    getSubjectsByEmail,
    getSubjects,
    getSubject,
    createSubject,
    deleteSubject,
    updateSubject
} = require('../controllers/Subjectcontroller')

const router = express.Router()

router.get('/email/:email', getSubjectsByEmail)

// Get all subjects
router.get('/', getSubjects)

// Get single subject
router.get('/:id', getSubject)

// Post a new subject
router.post('/', createSubject)

// Delete a subject
router.delete('/:id', deleteSubject)

// Update a subject
router.patch('/:id', updateSubject)

module.exports = router
