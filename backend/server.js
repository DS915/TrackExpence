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
    try {
        await mongoose.connect("mongodb+srv://shahdhruvil125_db_user:VXurOWkWLisFXnve@cluster0.v6dnksf.mongodb.net/Expence");

        console.log("DB CONNECTED");

        const users = await  userModel.find();

        res.status(200).json({
            success: true,
            message: "Database connected successfully",
            data: users
        });

    } catch (error) {
        console.log("connectDB error", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(port,async ()=>{

    //DB
await connectDB();
    console.log(`Server Started on http://localhost:${port}`);
})