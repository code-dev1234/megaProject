const mongoose = require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema({
     
     user:{
        type:mongoose.Schema.Type.ObjectId,
        require:true,
        ref:"User"
     },
     rating:{
        type:Number,
        require:true
     },
     reviews:{
        type:String,
        require:true
     }
})

module.exports = mongoose.model("RatingAndReviews",ratingAndReviewsSchema)