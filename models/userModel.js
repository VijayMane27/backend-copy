const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
},
designation: {
    type: String,
    required: true
},
qualification: {
    type: String,
    required: true
},
dob: {
    type: String,
    required: true
},
basicPay: {
    type: Number ,
    required: true 
},
languages: {
    type: String,
    required: true
},
employeeNo:{
    type: String,
    required: true
},
aadharNo: {
    type: Number,
    required: true
},
panNo: {
    type: String,
    required: true
},
phoneNo: {
    type: Number,
    required: true
},
address: {
    type: String,
    required: true
},
bloodGroup: {
    type: String,
    required: true
},
   
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true })

userSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
  }catch(error){
    console.log(error)
  }
}

module.exports = mongoose.model('User', userSchema)