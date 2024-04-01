const express=require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const jwt= require("jsonwebtoken")
const app= express()
const port = 5000
const cors = require("cors")

const http= require("http").createServer(app)
const io= require("socket.io")(http)

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())

mongoose.connect("mongodb+srv://jasmitamukherjee4:jasmita@cluster0.tx8ce4w.mongodb.net/").then(()=>{
    console.log("Connected to MongoDB")
}).catch(error =>{
    console.log("Error connecting to MongoDB",error)
})

app.listen(port,() => {
    console.log("Server running on port 5000")
})


const Employer= require("./models/Employer")
const Employee= require("./models/Employee")

app.post("/registerEmployer",async(req,res)=>{
    try {
        const employerData = req.body
        const newEmployer = new Employer(employerData)
        await newEmployer.save()

        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({employerId: newEmployer._id} ,secretKey);

        res.status(200).json({token});

    } catch (error) {
        console.log("Error creating Employer",error)
        res.status(500).json({error:"Internal server error"})
        
    }
})



app.post("/registerEmployee",async(req,res)=>{
    try {
        const employeeData = req.body
        const newEmployee = new Employer(employeeData)
        await newEmployee.save()

        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({employeeId: newEmployee._id} ,secretKey);

        // console.log(token)
        res.status(200).json({token});
        
    } catch (error) {
        console.log("Error creating Employee",error)
        res.status(500).json({error:"Internal server error"})
        
    }
})