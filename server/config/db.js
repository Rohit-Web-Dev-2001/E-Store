const { default: mongoose } = require("mongoose");

exports.connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_STRING)
        if (connect) {
            console.log("MongoDb is connected");
            
        } else {
            console.log("Somthing went wrong");
            
        }
    } catch (error) {
        console.log(error);
        
    }
}