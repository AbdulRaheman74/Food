import express from "express";
// import bodyParser from "body-parser";       
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

//config
const app=express();
dotenv.config();
const port = process.env.PORT || 6060;

//middlewares
app.use(express.json());
const whitelist = [
    "http://localhost:5173",              // local frontend
    "http://localhost:5174",              // local frontend
    "https://food-inky-xi.vercel.app",   // main frontend
    "https://food-4kdy.vercel.app"       // admin panel
];

app.use(cors({
    origin: function(origin, callback){
        // origin null ho sakta hai (Postman ya direct browser request)
        if(!origin || whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));


app.get("/",(req,res)=>{
    res.send("API is running successfully");
})
connectDB();
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads")); //is se apun google pe bhi image dekh sakte hain
app.use("/api/user",userRoute)
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
//VhE3iD0XGOABa125,mongodb+srv://<db_username>:<db_password>@cluster0.vob6aes.mongodb.net/,	
// its.ar.raheman.99