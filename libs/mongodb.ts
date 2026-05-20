import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
      return;
    }

    if (connectionState === 2) {
      let attempts = 0;
      while (mongoose.connection.readyState === 2 && attempts < 50) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }
      if (mongoose.connection.readyState === 1) return;
    }
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectMongoDB;