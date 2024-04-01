const mongoose= require("mongoose")
const Schema = mongoose.Schema;

const employerSchema = new Schema({
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

      employeePreferences:[
        {
            type : String
        }
      ],
      companyOffers:[{

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
          ref: 'Employer',
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
          ref: 'Employer',
        },
      ],

})

const Employer = mongoose.model("Employer",employerSchema)
module.exports = Employer;