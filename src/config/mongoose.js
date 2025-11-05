import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); // Corta el proceso si no hay conexión
  }
};
