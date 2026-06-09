const { models } = require("mongoose")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")


//resetPasswordToken

exports.resetPasswordToken = async (req,res)=>{
    try{

        //get email from req.body
        const {email} = req.body

        //check user for this email
        const user = User.findOne({email})

        if(!user){
            return res.status(401).json({
                success:true,
                message:"Your email is not registered with us"
            })
        }

        // genrate token
        const token = crypto.randomUUID();

        //update the user by ading token and expire time
        const updatedDetails = await User.findOneAndUpdate(
                                          {email:email},
                                          {
                                             token:token,
                                             resetPasswordExpires: Date.now() + 5*60*1000
                                          }
        )


        // create url for frontend
        const url = `http://localhost:3000/update-password/${token}`

        // send email
        await mailSender(email,"Password reset link", `Password reset link ${url}`)

        res.status(200).json({
            success:true,
            message:"Mail send successfully, plese check your email"
        })

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}


// resetPassword 
exports.resetPassword = async (req,res)=>{
    try{

        // data fatch 
        const {password, confirmPassword,token} = res.body

        //validation
        if(password != confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password not match"
            })
        }

        //get user detail from db using token 
        const userDetails = User.findOne({token:token})

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"token invalide"
            })
        }


        // check token is valide

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"password expire, please regenerate"
            })
        }

        // hash password 
        const hashPassword = await bcrypt.hash(password,10);

        const updatePassword = await User.findOneAndUpdate(
                                     {token:token},
                                     {password:hashPassword},
                                     {new:true}
        )


        res.status(200).json({
            success:false,
            message:"Password update successfully"
        })


    }
    catch(error){
        
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}