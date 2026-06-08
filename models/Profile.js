const mongoose = require("mongoose")

const profileShema = new mongoose.Schema({
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true
    },
    contectNumber:{
        type:String,
        trim:true
    }

})

module.exports = mongoose.model("Profile",profileShema)