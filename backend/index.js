const express = require('express')
const app = express()
var jwt = require('jsonwebtoken');
const sKey="dd454564dghdhgd"
var cors = require('cors')
app.use(cors())
const port = 5000
/////////connect database/////////
require("./db/connection")
////////////register model connect//////////
const Register = require("./model/registeration")
const Admin=require('./model/adminRegister');

//////////to receive body data/////////////
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const saltRounds = 10;
/////////admin insert////////////////
app.post('/admin-register', async (req, res) => {
    const { name, email, password, conpassword } = req.body
    if (password === conpassword) {
        const preUser = await Admin.findOne({ email })
       
        if (!preUser) {
            const hashPass=await bcrypt.hash(password,saltRounds)
            const hashConPass=await bcrypt.hash(conpassword,saltRounds)
            const registerData = await Admin({ name, email, password:hashPass, conpassword:hashConPass });
            const result = await registerData.save();
          
            res.send({ message: 'Admin register successfully', userData: result })
        }
        else {
            res.send({ message: 'Already Admin user register!!!' })
        }
    }
    else {
        res.send({ message: 'Your password and conpassword is not match' })
    }
})

////////admin-login api/////////////

app.post('/admin-login',  async(req, res)=> {
    const{email,password}=req.body
    if(email && password){
        const userEmail=await Admin.findOne({email})
       //console.log(userEmail)     
        if(userEmail!==null){
            const passMatch=await bcrypt.compare(password,userEmail.password);
            if(userEmail.email==email && passMatch){
                var token=await jwt.sign({userEmail},sKey,{expiresIn:"1h"})
                res.send({message:"Login success",userEmail,token})
            }
            else{
                res.send({message:"Your Email or password is not match"})
            }           
        }
        else{
            res.send({message:"You are not Register User"})
        }        
    }
    else{
        res.send({message:"All fields are required."})
    }
});










/////////insert api/////////////////
app.post('/register', async (req, res) => {
    const { name, email, password, conpassword, address, mobile } = req.body
    
    if (password === conpassword) {
        const preUser = await Register.findOne({ email })
       
        if (!preUser) {
            const hashPass=await bcrypt.hash(password,saltRounds)
            const hashConPass=await bcrypt.hash(conpassword,saltRounds)
            const registerData = await Register({ name, email, password:hashPass, conpassword:hashConPass, address, mobile });
            const result = await registerData.save();
            res.send({ message: 'register successfully', userData: result })
        }
        else {
            res.send({ message: 'Already user register!!!' })
        }
    }
    else {
        res.send({ message: 'Your password and conpassword is not match' })
    }

})
/////////////////fetch api////////////

app.get('/fetch',async(req,res)=>{
    const result=await Register.find()
    res.send(result)
})
///////////delete api////////////////

app.delete('/delete/:id',async(req,res)=>{
    //console.log(req.params.id)
     const result=await Register.deleteOne({_id:req.params.id})
     res.send(result)
});
///////////get datails for particular user/////////////

app.get('/getDetails/:id',async(req,res)=>{
    const result=await Register.findById({_id:req.params.id},{password:0,conpassword:0})
    res.send(result)
})

///////////////update api/////////////////
app.put("/update/:id",async(req,res)=>{
    const{name,email,mobile,password,conpassword,address}=req.body
   
    if(password && conpassword){
        const hashPass=await bcrypt.hash(password,saltRounds);
        const hashConPass=await bcrypt.hash(conpassword,saltRounds);
        let result=await Register.updateOne(
            {_id:req.params.id},
            {$set:{name,email,mobile,password:hashPass,conpassword:hashConPass,address}
        });
        res.send({status:200,message:"Update success"})
    }
    else{        
        let result=await Register.updateOne(
            {_id:req.params.id},
            {$set:req.body
        });
        res.send({status:200,message:"Update success"})
    }
    
 
});



app.listen(port, () => {
    console.log(`App running on port ${port}`)
    console.log(`http://localhost:${port}`)
})