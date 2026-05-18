import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
      console.log("Already connected to DB.");
      return;
    }

    if (connectionState === 2) {
      console.log("Connecting to DB...");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to DB.");
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;