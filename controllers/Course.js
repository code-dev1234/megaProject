const Course = require("../models/Course")
const Tags = require("../models/Tag")
const User = require("../models/User")
const {uploadImageTOCloudinary} = require("../utils/imageUploader")


//create course
exports.createCourse = async (req,res)=>{
    try{

        //get data 
        const {course,courseDescription,whatYouWillLearn,price,tag}=req.body;

        //get image
        const thumbnail = req.files.thumbnailImage;

        //apply validation

        if(!course || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"all fileds are required"
            })
        }

        //check for instructor
        const userID = req.user.id;
        const instructor = await User.findById(userID);
        console.log("instructor",instructor);

        if(!instructor){
            return res.status(400).json({
                success:false,
                message:"Instructor not found"
            })
        }


        // find tags

        const tagDetail = await Tags.findById(tag);
        if(!tagDetail){
            return res.status(400).json({
                success:false,
                message:"Tag not found"
            })
        }


        //upload image in cloudinary
        const thumbnailImage = await uploadImageTOCloudinary(thumbnail,process.env.FOLDER_NAME)

        //create entry in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructor._id,
            whatYouWillLearn,
            price,
            tag:tagDetail._id,
            thumbnail:thumbnailImage.secure_url
        })

        //add new course to user schema
        await User.findByIdAndUpdate(
             {_id:instructor._id},
             {
                $push:{
                    course:newCourse._id
                }
             },
             {new:true}
        )



        res.status(200).json({
            success:true,
            message:"create course successfully",
            data:newCourse
        })


    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



//getallCourses

exports.getAllCourses = async (req,res)=>{
    try{

        //get all data 

        const allData = await Course.find({},
                                          {price:true,thumbnail:true,courseName:true,instructor:true})
                                          .populate("instructor").exec();

         //validation

         if(!allData){
            return res.staus(400).json({
                success:false,
                message:"course not found"
            })
         }

         res.status(200).json({
            success:true,
            message:"Gat all data successfully",
            data:allData
         })
         
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Course not found"
        })
    }
}