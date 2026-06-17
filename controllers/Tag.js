const Tags = require("../models/Tag")


// create tag handler 

exports.createTags = async (req,res)=>{
    try{

        //get data 
        const {name,description} = res.body

        //apply validation
        if(!name || description){
        return res.status(400).json({
            success:false,
            message:"All fileds are required"
        })
       }

        //crate entry in db
        const tagsDetails = await Tags.create({
            name,
            description
        })

        console.log(tagsDetails,"tagsDetails")

        res.status(200).json({
            success:true,
            message:"tag create successfully"
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// get all tages

exports.showAllTags = async (req,res)=>{
    try{
          // find all tage insore name and discription prsent
        const allTags = await Tags.find({},{name:true,discription:true})

        if(!allTags){
             return res.status(400).json({
                success:false,
                message:"Tags not avelable"
             })
        }

        res.status(200).json({
            success:true,
            message:"Get all tags successfully",
            allTags
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}