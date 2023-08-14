const mongoose=require("mongoose");

var mongoURL="mongodb+srv://Sheeza:Sheeza*427@hotel.lu3uwah.mongodb.net/hotelDB"

mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewUrlParser:true})

var connect=mongoose.connection

connect.on("error" , ()=>{
    console.log("MongoDb Connection failed")
})
connect.on("connected" , ()=>{
    console.log("MongoDb Connected")
});
module.exports=mongoose;