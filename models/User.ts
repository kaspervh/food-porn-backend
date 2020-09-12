const mongooseUser:any = require('mongoose');

const UserSchema = mongooseUser.Schema({
  email: {
    type: String,
    Required: true
  },

  username:{
    type: String,
    required: true,
    unique: true
  },
  
  password:{
    type: String, 
    Required: true
  },

  userType: {
    type: String,
    required: true
  }
  
})

module.exports = mongooseUser.model('User', UserSchema);