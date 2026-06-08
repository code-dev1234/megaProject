const User = require("../models/User")
const OTP = require("../models/Otp")

const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// sed otp

exports.sendOTP = async (req,res)=>{
    try{

        // get email from request body
        const {email} = req.body;

        //check user already exist
        const userExist = await User.findOne({email})

        // if user exist return response

        if(userExist){
            res.status(401).json({
                success:false,
                message:"user already exist"
            })
        }

        // other wise genrate OTP

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        // check unique otp or not 
        let result = await OTP.findOne({otp:otp})

        while(result){

            otp = otpGenerator(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
            })

            result = await OTP.findOne({otp:otp})

        }

        const optPayload = {email,otp};

         //insert in db
        const otpBody = User.create(optPayload);
        console.log(otpBody)

        //return response
        res.status(200).json({
           success:true,
           message:"otp send Successful",
           otp
        })

    }
    catch(error){
        console.log(error)
        res.status(401).json({
           success:false,
           message:error.message
        })
    }
}



// sign up

exports.signUp = async (req,res)=>{
    try{

        //get all value 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contectNumber,
            otp
        } = req.body;


        // validation 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
             return res.status(401).json({
                success:false,
                message:"all filed are required"
            })
        }

        //2 password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword does not match. please try again"
            })
        }

        //check user already exist or not 
        const userexist = User.findOne({email});
        if(userexist){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }


        //find mostone otp store in user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recentOtp",recentOtp)

        //validate otp
        if(recentOtp.length == 0){
            //OTP not found
            return res.status(400).json({
                success:false,
                message:"OTPP found"
            })
        }
        else if(otp != recentOtp.otp){
            //Invalid otp
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }


        //hash password
        const hashPassword = await bcrypt.hash(password,10);

        //entry create in db

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contectNumber:null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contectNumber,
            password:hashPassword,
            account:null,
            additionalDetails:profileDetails._id,
            image:null
        })

        res.status(200).json({
            success:true,
            message:"user registered successfully"
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}


// login 

exports.login = async(req,res)=>{
    try{

        //get data
        const {email,password} = req.body;

        //apply validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All filed are required,please try again"
            })
        }

        //user check exist or not
        const user = User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not register, please sign up first"
            })
        }

        //match password then crate token
        if(bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                roll:user.accountType
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

            user.token = token;
            user.password = undefined;

            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }


            //create cookie and send response
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}

// change password

exports.changePassword = async (req,res)=>{
    try{

        // get data 
        const {password,newPassword,confirmPassword} = req.body;

        //apply validation
        if(!password || !newPassword || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:"All filed are required"
            })
        }

        //match password
        if(newPassword != confirmPassword){
            return res.status(401).json({
                success:false,
                message:"newPassword and confirmPassword not match"
            })
        }

        //get user
        const user = User.findOne

    }
    catch(error){

    }
}