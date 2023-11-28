const mongoose = require('mongoose');
/////////////schema collection/////////////
const registerSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  email: {type: String},
  password:String,
  conpassword:String,
  address: String,
  mobile:Number,
  date: { type: Date, default: Date.now },
});
///////////creating a model//////////////
const Register = mongoose.model('Register', registerSchema);
module.exports=Register