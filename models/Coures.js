const mongoose = require("mongoose")

const couresSchema = new mongoose.Schema({
       couresName:{
        type:String,
        trim:true
       },
       couresDescription:{
        type:String,
        trim:true,
       },
       instructor:{
        type:mongoose.Schema.Type.objectId,
        ref:"User",
        require:true
       },
       whatYouWillLearn:{
        type:String
       },
       couresContent:[
        {
            type:mongoose.Schema.Type.objectId,
            ref:"Section"
        }
       ],
       ratingAndReviews:[
        {
            type:mongoose.Schema.Type.objectId,
            ref:"RatingAndReview",
        }
       ],
       price:{
        type:Number
       },
       thumbnail:{
        type:String
       },
       tag:{
         type:mongoose.Schema.Type.objectId,
         ref:"Tag"
       },
       studentsEnrolled:[
        {
            type:mongoose.Schema.Type.objectId,
            require:true,
            ref:"User"
        }
       ]

})

module.exports = mongoose.model("Coures",couresSchema)