const mongoose = require("mongoose");
require(dotenv).config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("db connected successfull")
    }).catch((error)=>{
        console.log(error)
        console.log("some issue in db connection")
        process.exit(1)
    })
}