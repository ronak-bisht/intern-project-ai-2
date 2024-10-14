import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

// Hardcoded MongoDB connection string
const MONGODB_URI = 'dburl';

// Function to connect to MongoDB
async function dbConnect(): Promise<void> {
    // If already connected, reuse the existing connection
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process if unable to connect
    }
}

export default dbConnect;
