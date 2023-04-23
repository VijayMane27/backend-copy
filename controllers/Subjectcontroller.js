const Subject = require('../models/Subjectmodel')
const mongoose = require('mongoose')

const getSubjectsByClass = async (req, res) => {

  console.log(req.params);

  const { Class } = req.params;

  try {
    const subjects = await Subject.find({ Class });

    if (subjects.length === 0) {
      return res.status(404).json({ error: 'No subjects found' });
    }
    console.log(subjects)
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({}).sort({ createdAt: -1 })

    if (subjects.length === 0) {
      return res.status(404).json({ error: 'No subjects found' })
    }

    res.status(200).json(subjects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getSubject = async (req, res) => {

  const { id } = req.params

  try {
    const subject = await Subject.findById(id)

    if (!subject) {
      return res.status(404).json({ error: 'No subject found' })
    }

    res.status(200).json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createSubject = async (req, res) => {
  const { NAME,Class } = req.body

  if (!NAME || !Class) {
    return res.status(400).json({ error: 'Please fill in all fields' })
  }

  try {
    const subject = await Subject.create({ NAME,Class })
    res.status(201).json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteSubject = async (req, res) => {
  const { id } = req.params

  try {
    const subject = await Subject.findByIdAndDelete(id)

    if (!subject) {
      return res.status(404).json({ error: 'No subject found' })
    }

    res.status(200).json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateSubject = async (req, res) => {
  const { id } = req.params

  try {
    const subject = await Subject.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!subject) {
      return res.status(404).json({ error: 'No subject found' })
    }

    res.status(200).json(subject)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getSubjectsByClass,
  getSubjects,
  getSubject,
  createSubject,
  deleteSubject,
  updateSubject,
}
