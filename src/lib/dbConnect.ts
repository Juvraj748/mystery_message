import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number,
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to Database")
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGO_DB_URI || '', {})
        connection.isConnected = db.connection.readyState;
        log("Connected to Database successfully!")
    } catch (error) {
        log("Database connection failed", error);
        process.exit();
    }
}

export default dbConnect;