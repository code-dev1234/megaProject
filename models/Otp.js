const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const OTPSchema = new mongoose.Schema({

    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60
    }

})


async function sendVerificationEmail(email,otp){
    try{

        const mailResponse = mailSender(email,"Verification email", otp)
        console.log(mailResponse);

    }
    catch(error){
        console.log("error in sending email",error)
    }
}


OTPSchema.pre("save",async function(next){
     await sendVerificationEmail(this.email,this.otp);
     next();
})


module.exports = mongoose.model("OTP",OTPSchema)