const mongoose= require("mongoose")
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    userType: {
        type: String,
       
      },
    firstName: {
        type: String,
         required: true,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
         required: true,
        unique: true,
      },
      password: {
        type: String,
         required: true,
      },
      gender: {
        type: String,
         required: true,
      },
      
      location: {
        type: String,
         required: true,
      },

      lookingFor:[
        {
            type : String
        }
      ],
      skillsScreen:[{

        type:String

      }],
      
      
      imageUrls: [
        {
          type: String, // Store URLs of profile pictures
        },
      ],
      prompts: [
        {
          question: {
            type: String,
             required: true,
          },
          answer: {
            type: String,
             required: true,
          },
        },
      ],
      likedProfiles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Employee',
        },
      ],
      receivedLikes: [
        {
          employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employer',
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
          },
        },
      ],
      matches: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Employee',
        },
      ],

})

const Employee = mongoose.model("Employee",employeeSchema)
module.exports = Employee;