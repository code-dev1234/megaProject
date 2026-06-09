const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true,
    },
    lastName:{
        type:String,
        require:true,
        trim:true,  
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        require:true
    },
    additionalDetails:{
        type:mongoose.Schema.Type.objectId,
        require:true,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Type.objectId,
            ref:"Courses"
        }
    ],
    image:{
        type:String,
        require:true,
    },
    token:{
      type:string,

    },
    resetPasswordExpires:{
       type:string
    },
    coursesProgress:[
        {
            type:mongoose.Schema.Type.objectId,
            ref:"CoursesProcess",
        }
    ]
})

module.exports = mongoose.model("User",userSchema)