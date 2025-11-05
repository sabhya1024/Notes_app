import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const db_conn = process.env.REACT_APP_MONGO_CONN;

const connectDB = async () => {
    try {
        await mongoose.connect(db_conn);
        console.log("MONGO_DB connected successfully.");
    }
    catch (error) {
        console.error("erorr connecting to mongoDB", error);
        process.exit(1) 
    };
    
}

export default connectDB;