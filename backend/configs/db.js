import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log(" DB connected"));
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
    });
  } catch (error) {
    console.log(" MongoDB connection error:", error.message);
  }
};

export default connectDB;
