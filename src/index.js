import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routers/userRoutes.js";
import productRoutes from "./routers/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // menangani JSON body

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Root check (optional)
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
