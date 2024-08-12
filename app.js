require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const authMiddleware = require("./middleware/authMiddleware");

// Database connection
const dbconnection = require("./db/dbConfig");
app.use(cors());

// Route middleware for creating tables
const createTablesRoute = require("./db/create-Tables");
app.use("/install", createTablesRoute);

// User routes middleware file
const userRoutes = require("./routes/userRoutes");

// Middleware to extract JSON data
app.use(express.json());

// User routes middleware
app.use("/api/user", userRoutes);

async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    app.listen(port, "0.0.0.0", () => {
      // Explicitly bind to 0.0.0.0
      console.log(result);
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
start();

// Question routes middleware file
const questionRoutes = require("./routes/questionRoutes");

// Question routes middleware
app.use("/api/question", authMiddleware, questionRoutes);

// Answer routes middleware file
const answerRoutes = require("./routes/answerRoute");

// Answer routes middleware
app.use("/api/answer", authMiddleware, answerRoutes);
