import mongoose from "mongoose";

 const mongodbURL=process.env.MONGODB_URL ;
//  console.log(mongodbURL);
 const mongodbName=process.env.MONGODB_NAME; 
 const connectDB= async()=>{
     console.log("connecting to db",mongodbURL);
     try{
        const connect=await mongoose.connect(`${mongodbURL}/${mongodbName}`);

        // console.log("databse connected sucessfully")
        //return res.status(201).send({message:"sucessfully connected"})
        console.log("database connected sucessfully");
    }catch(err){
        console.log("error in connecting to db",err.message)
    }
 }
  export default connectDB;