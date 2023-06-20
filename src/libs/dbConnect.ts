import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("Environment variables not set.");
}

export const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.asPromise();
    console.log("Talking to database.");
    return db;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "flourish-academy",
    });
    console.log("Conntected to database.");
    return db;
  } catch (err) {
    throw new Error("Could not connect to database.");
  }
};
