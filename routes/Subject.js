const express = require('express')
const {
    getSubjects,
    getSubject,
    createSubject,
    deleteSubject,
    updateSubject,
    getSubjectsByClass
} = require('../controllers/Subjectcontroller')

const router = express.Router()

router.get('/Subject/:Class', getSubjectsByClass)

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
