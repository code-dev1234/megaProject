const Section = require("../models/Section")
const Course = require("../models/Course")

exports.createSection = async (req,res)=>{
    try{

        //data fetch 
        const {sectionName,courseId} = req.body;

        //apply validation

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        }

        // create section
        const newSection = await Section.create({sectionName})

        //update course with section and object id
         const UpdateCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseCountent:newSection._id,
                }
            },
            {new:true}
         ).populate({
            path:"courseCountent",
            populate:{
                path:"subsection",
            },
         });


         res.status(200).json({
            success:true,
            message:"section create successfully"
         })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



exports.updateSection = async (req,res)=>{
    try{

        //get data
        const {sectionName,sectionID}=req.body;

        //apply validation
        if(!sectionName || !sectionID){
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            })
        }

        //update data 
        const newData = await Section.findByIdAndUpdate(sectionID,{sectionName},{new:true});

        res.status(200).json({
            success:true,
            message:"data updated successfully"
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.deleteSection = async (req,res)=>{
    try{

        //get data 
        const {sectionID} = req.parems;

        //delete
        await Section.findByIdAndDelete(sectionID)

        res.status(200).json({
            success:true,
            message:"delete successfully"
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}