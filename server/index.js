const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const userRoute = require("./routes/userRoutes")
require("dotenv").config()


const uri = process.env.MONGO_URI
const port = process.env.PORT || 5000


const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute)

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

mongoose.connect(uri , {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(()=> console.log("mongo db connection successful")).catch((er)=>console.log(er.message , "mongo connection fail"))
