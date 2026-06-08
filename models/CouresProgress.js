const mongoose = require("mongoose")

const couresProgress = new mongoose.Schema({

    couresID:{
        type:mongoose.Schema.Type.objectId,
        ref:"Coures"
    },
    completedVideos:[
        {
            type:mongoose.Schema.Type.objectId,
            ref:"SubSection"
        }
    ]

})

module.exports = mongoose.model("CouresProgress",couresProgress)