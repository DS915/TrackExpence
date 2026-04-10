import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import mongoose from "mongoose";
import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';
import userModel from './models/userModel.js';


const app = express();
const port = 4000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use((req, res, next) => {
    res.on("finish" , () => {
        // console.log("origin", res.getHeader("Access-Control-Allow-Origin"));
        
    })

    next()
})

//ROUTES
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);

app.get('/', async (req, res) => {
    res.send("Server is running successfully" )
});



app.listen(port,async ()=>{

    //DB
await connectDB();
    console.log(`Server Started on http://localhost:${port}`);
})