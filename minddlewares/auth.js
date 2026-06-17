const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")


//auth

exports.auth = async (req,res,next)=>{
    try{
      
        //gett token
        const token = res.cookies.token || res.body.token || res.header("Authorisation").replace("Bearer","");

        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        // token virification
        try{
          const decode = await jwt.verify(token,process.env.JWT_SECRET);
          console.log(decode);
          req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalide"
            })

        }
        next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Somthing wnt wrong while validating error"
        })

    }
}




// for Student

exports.isStudent = async (req,res,next)=>{
    try{

        if(req.user.accountType != "Student"){
            return res.status(401).json({
                success:false,
                message:"This route only for student"
            })
        }
        next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User roll not verified,please try again"
        })
    }
}

// instructor

exports.isInstructor = async (res,res,next)=>{
    try{

        if(req.user.accountType != "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This route only for instructor"
            })
        }
          next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User roll not verified,please try again"
        })
    }
}

//Admin

exports.isAdmin = async (res,res,next)=>{
    try{

        if(req.user.accountType != "Admin"){
            return res.status(401).json({
                success:false,
                message:"This route only for admin"
            })
        }

        next();

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User roll not verified,please try again"
        })
    }
}
