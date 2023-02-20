const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const getUserByEmail = async(req, res) =>{
  const {email} = req.params
  
  const userByEmail = await User.find({email})
  
  if (!userByEmail){
      return res.status(400).json({ error: 'No such schedule'})
  }
  
  res.status(200).json(userByEmail)
  
  }

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
  const {email, password,name, designation, qualification, dob, basicPay, languages, employeeNo, aadharNo, panNo, phoneNo, address, bloodGroup} = req.body

  let emptyFields = []

  if (!email) {
    emptyFields.push('username')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (!name) {
    emptyFields.push('name')
  }
  if (!designation) {
    emptyFields.push('designation')
  }

  if (!qualification) {
    emptyFields.push('qualification')
  }
  if (!dob) {
      emptyFields.push('dob')
    }
  if (!basicPay) {
      emptyFields.push('basicPay')
    }
  if (!languages) {
      emptyFields.push('languages')
    }
    if (!employeeNo) {
      emptyFields.push('employeeNo')
    }
  if (!aadharNo) {
      emptyFields.push('aadharNo')
    }
  if (!panNo) {
      emptyFields.push('panNo')
    }
  if (!phoneNo) {
      emptyFields.push('phoneNo')
    }
  if (!address) {
      emptyFields.push('address')
    }
    if (!bloodGroup) {
      emptyFields.push('bloodGroup')
    }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const userExist = await User.findOne({ email: email })
    if(userExist){
        return res.status(422).json({ error: "Email already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    const user = await User.create({ email, password:hashPass,name,designation,qualification, dob, basicPay, languages, employeeNo, aadharNo, panNo, phoneNo, address, bloodGroup})
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }

  const user = await User.findOneAndDelete({_id: id})

  if(!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

module.exports = {
  getUserByEmail,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
}