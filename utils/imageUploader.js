
const cloudinary = require("cloudinary").v2

exports.uploadImageTOCloudinary = async (file,folder,hight,quality)=>{
    try{
        const options = {folder}
        if(hight){
            options.hight = hight;
        }
        if(quality){
            options.quality = quality
        }

        options.resource_type = "auto"

        return await cloudinary.uploader.upload(file.tempFilePath,options)
    }
    catch(error){
        console.log("error in image uplade in cloudinary",error)
    }
}