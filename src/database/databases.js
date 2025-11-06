import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// create a connection pool (recommended)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Test connection
try {
  const connection = await db.getConnection();
  console.log("✅ Connected to MySQL Database");
  connection.release();
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
}

export default db;
