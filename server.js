import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors"

//config env
dotenv.config();


//Config Database
connectDB()

//ES6 Module fix
//const __filename = fileUrlToPath(import.meta.url);
//const __dirname = path.dirname(__filename);


//rest Object
const app = express();

//Middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))



//routes

app.use("/api/v1/auth",authRoutes)



//rest apis

app.get("/", (req, res)=>{
    res.send("<h1>Welcome to Saviff</h1>")
});



//Port
const Port = process.env.PORT|| 8080

//Port run
app.listen(Port,()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${Port}`)
});




