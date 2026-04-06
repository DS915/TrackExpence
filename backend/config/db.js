import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://shahdhruvil125_db_user:VXurOWkWLisFXnve@cluster0.v6dnksf.mongodb.net/Expence")
        .then(()=>console.log("DB CONNECTED")).catch((err) => console.log("err", err));
    } catch (error) {
        console.log("connectDB error", error);
        process.exit(1)
    }
}