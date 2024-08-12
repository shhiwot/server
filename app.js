require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const authMiddleware = require("./middleware/authMiddleware");

// Database connection
const dbconnection = require("./db/dbConfig");

app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Route middleware for creating tables
const createTablesRoute = require("./db/create-Tables");
app.use("/install", createTablesRoute);

// User routes middleware
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

// Question routes middleware
const questionRoutes = require("./routes/questionRoutes");
app.use("/api/question", authMiddleware, questionRoutes);

// Answer routes middleware
const answerRoutes = require("./routes/answerRoute");
app.use("/api/answer", authMiddleware, answerRoutes);

async function start() {
  try {
    // Test the database connection
    const [rows] = await dbconnection.execute("SELECT 'test'");
    console.log(rows);

    // Start the server
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

start();
