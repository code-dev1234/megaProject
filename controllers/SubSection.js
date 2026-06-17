const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageTOCloudinary} = require("../utils/imageUploader");

require(dotenv).config();

//create subSection

exports.createSubSection = async (req,res) =>{
    try{

        //get data 
        const {sectionId, title,timeDuration,description}=req.body

        //get video
        const video = req.files.videoFile;

        //apply validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"filed are missing"
            })
        }

        //upload file to cloudinary
        const uploadedDetails = await uploadImageTOCloudinary(video,process.env.FOLDER_NAME);

        //create subSection
        const SubSectionDetail = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl:uploadedDetails.secure_url
        }) 

        //add subSection in section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {$push:{
                subSection:SubSectionDetail_id
            }},{new:true}
        ).populate("subSection")


        res.status(200).json({
            success:true,
            message:"SubSection create successfully",
            updatedSection
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}