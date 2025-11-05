import app from "./app.js";
import { createInitialAdmin } from "./config/initialAdmin.js";
import { connectDB } from "./config/mongoose.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    await createInitialAdmin();// Crea un admin por las dudas
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
};

startServer();