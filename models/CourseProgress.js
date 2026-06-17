const mongoose = require("mongoose")

const courseProgress = new mongoose.Schema({

    courseID:{
        type:mongoose.Schema.Type.objectId,
        ref:"Course"
    },
    completedVideos:[
        {
            type:mongoose.Schema.Type.objectId,
            ref:"SubSection"
        }
    ]

})

module.exports = mongoose.model("CourseProgress",courseProgress)