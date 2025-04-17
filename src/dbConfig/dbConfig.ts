import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export async function connect() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing MONGO_URI in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error: " + err);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Something went wrong!", error);
  }
}
