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
        res.header("Access-Control-Allow-Origin", "*"); // Add this line

        res.status(200).json({token});

    } catch (error) {
        console.log("Error creating Employer",error)
        res.status(500).json({error:"Internal server error"})
        
    }
})



app.post("/registerEmployee",async(req,res)=>{
    try {
        const employeeData = req.body
        const newEmployee = new Employee(employeeData)
        await newEmployee.save()

        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({employeeId: newEmployee._id} ,secretKey);

        res.header("Access-Control-Allow-Origin", "*"); // Add this line

        res.status(200).json({token});
        
    } catch (error) {
        console.log("Error creating Employee",error)
        res.status(500).json({error:"Internal server error"})
        
    }
})


//fetch data EMPLOYER
app.get('/employers/:employerId', async (req, res) => {
    try {
      const {employerId} = req.params;
  
      const employer = await Employer.findById(employerId);
  
      if (!employer) {
        return res.status(500).json({message: 'Employer not found'});
      }
  
      return res.status(200).json({employer});
    } catch (error) {
      res.status(500).json({message: 'Error fetching the Employer details'});
    }
  });
  
  //fetch data EMPLOYEE
  app.get('/employees/:employeeId', async (req, res) => {
    try {
      const {employeeId} = req.params;
  
      const employee = await Employee.findById(employeeId);
  
      if (!employee) {
        return res.status(500).json({message: 'Employee not found'});
      }
  
      return res.status(200).json({employee});
    } catch (error) {
      res.status(500).json({message: 'Error fetching the Employee details'});
    }
  });

  //endpoint to LOGIN EMPLOYEE

  app.post('/loginEmployee', async (req, res) => {
    try {
      const {email, password} = req.body;
  
      //check if the user exists already
      const employee = await Employee.findOne({email});
      if (!employee) {
        return res.status(401).json({message: 'Invalid email or password'});
      }
  
      //check in password is correct
      if (employee.password !== password) {
        return res.status(401).json({message: 'Invalide password'});
      }
  
      const secretKey = crypto.randomBytes(32).toString('hex');
  
      const token = jwt.sign({employeeId: employee._id}, secretKey, {expiresIn: '1d'});
  
      return res.status(200).json({token});
    } catch (error) {
      res.status(500).json({message: 'login failed'});
    }
  });


   //endpoint to LOGIN EMPLOYER

   app.post('/loginEmployer', async (req, res) => {
    try {
      const {email, password} = req.body;
  
      //check if the user exists already
      const employer = await Employer.findOne({email});
      if (!employer) {
        return res.status(401).json({message: 'Invalid email or password'});
      }
  
      //check in password is correct
      if (employer.password !== password) {
        return res.status(401).json({message: 'Invalide password'});
      }
  
      const secretKey = crypto.randomBytes(32).toString('hex');
  
      const token = jwt.sign({employerId: employer._id}, secretKey, {expiresIn: '1d'});
  
      return res.status(200).json({token});
    } catch (error) {
      res.status(500).json({message: 'login failed'});
    }
  });

  //matches EMPLOYEE 

  app.get('/matchesEmployee', async (req, res) => {
    try {
      const {employeeId} = req.query;
  
      // Fetch user's dating preferences and type
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({message: 'Employee not found'});
      }
  
      let filter = {}; // Initialize filter as an empty object
  
      if (employee.gender === 'Men') {
        filter.gender = 'Women';
      } else if (employee.gender === 'Women') {
        filter.gender = 'Men';
      }
  
      // Construct query based on dating preferences and type
      let query = {
        _id: {$ne: employeeId},
      };
  
      // if (user.datingPreferences && user.datingPreferences.length > 0) {
      //   filter.datingPreferences = user.datingPreferences;
      // }
      if (employee.userType) {
        filter.userType = employee.userType; // Assuming user.type is a single value
      }
  
      const currentEmployee = await Employee.findById(employeeId)
        .populate('matches', '_id')
        .populate('likedProfiles', '_id');
  
      // Extract IDs of friends
      const friendIds = currentEmployee.matches.map(friend => friend._id);
  
      // Extract IDs of crushes
      const crushIds = currentEmployee.likedProfiles.map(crush => crush._id);
  
      console.log('Filter', filter);
  
      // Fetch matches based on query
      const matches = await Employee.find(filter)
        .where('_id')
        .nin([employeeId, ...friendIds, ...crushIds]);
  
      return res.status(200).json({matches});
    } catch (error) {
      console.error('Error fetching matches of Employee:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  });

//matches EMPLOYER 
  
  app.get('/matchesEmployer', async (req, res) => {
    try {
      const {employerId} = req.query;
  
      // Fetch user's dating preferences and type
      const employer = await Employer.findById(employerId);
      if (!employer) {
        return res.status(404).json({message: 'Employer not found'});
      }
  
      let filter = {}; // Initialize filter as an empty object
  
      // if (employer.gender === 'Men') {
      //   filter.gender = 'Women';
      // } else if (employer.gender === 'Women') {
      //   filter.gender = 'Men';
      // }
  
      // Construct query based on dating preferences and type
      let query = {
        _id: {$ne: employerId},
      };
  
      // if (user.datingPreferences && user.datingPreferences.length > 0) {
      //   filter.datingPreferences = user.datingPreferences;
      // }
      if (employer.userType) {
        filter.userType = "employee"; // Assuming user.type is a single value
      }
  
      // const currentEmployer = await Employer.findById(employerId)
      //   .populate('matches', '_id')
      //   .populate('likedProfiles', '_id');

   const currentEmployer = await Employer.findById(employerId)
      .populate('matches','_id')
      .populate('likedProfiles',"_id");

      // Extract IDs of friends
      const friendIds = currentEmployer.matches.map(friend => friend._id);
  
      // Extract IDs of crushes
      const crushIds = currentEmployer.likedProfiles.map(crush => crush._id);
  
      // console.log('Filter', filter);
  
      // Fetch matches based on query
      const matches = await Employee.find(filter)
        .where('_id')
        .nin([employerId, ...friendIds, ...crushIds]);
  
      return res.status(200).json({matches});
    } catch (error) {
      console.error('Error fetching matches of Employe:', error);
      res.status(500).json({message: 'Internal server error'});
    }
  });