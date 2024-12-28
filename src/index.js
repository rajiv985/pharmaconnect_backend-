import 'dotenv/config' 
import connectDB from "./db/mongoose.connect.js";
import app from"./app.js"

const port=process.env.PORT;
// console.log(port);
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`)
    })
}).catch((error)=>{
    console.log("error is connecting", error)
}) 