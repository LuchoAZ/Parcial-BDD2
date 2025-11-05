import User from "../models/User.js";

export const createInitialAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) return;

    const adminData = {
      name: "Administrador",
      email: adminEmail,
      password: "admin",
      role: "admin",
    };

    await User.create(adminData);
  } catch (error) {
    console.error("Error creando usuario admin:", error.message);
  }
};
