const mongoose = require('mongoose');
/////////////schema collection/////////////
const registerSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  email: {type: String},
  password:String,
  conpassword:String,
 
  date: { type: Date, default: Date.now },
});
///////////creating a model//////////////
const AdminRegister = mongoose.model('AdminRegister', registerSchema);
module.exports=AdminRegister