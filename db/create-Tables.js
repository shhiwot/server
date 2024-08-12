
/******************************create-Tables.js*********************************************/
// const express = require("express");
// const route = express.Router();
// const dbconnection = require("../db/dbConfig");
// const { StatusCodes } = require("http-status-codes");

// route.get("/", async (req, res) => {
//   let browserdisplay = "Tables have been created.";

//   // SQL queries to create tables
//   const userTable = `CREATE TABLE IF NOT EXISTS userTable (
//     userId INT(20) NOT NULL AUTO_INCREMENT,
//     Username VARCHAR(20) NOT NULL UNIQUE,
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(40) NOT NULL UNIQUE,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY (userId)
//   )`;

//   const questionTable = `CREATE TABLE IF NOT EXISTS questionTable (
//     questionId INT NOT NULL AUTO_INCREMENT,
//     userId INT(20) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(20),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (questionId),
//     FOREIGN KEY (userId) REFERENCES userTable (userId)
//   )`;

//   const answerTable = `CREATE TABLE IF NOT EXISTS answerTable (
//     answerId INT(20) NOT NULL AUTO_INCREMENT,
//     userId INT(20) NOT NULL,
//     questionId INT NOT NULL,
//     answer VARCHAR(200) NOT NULL,
//     PRIMARY KEY (answerId),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (questionId) REFERENCES questionTable (questionId),
//     FOREIGN KEY (userId) REFERENCES userTable (userId)
//   )`;

//   // SQL query to alter the userTable and add new columns
//   const alterUserTable = `ALTER TABLE userTable
//     ADD COLUMN IF NOT EXISTS resetToken VARCHAR(255),
//     ADD COLUMN IF NOT EXISTS resetTokenExpiry BIGINT`;

//   let pool;

//   try {
//     pool = await dbconnection.getConnection();

//     // Execute table creation queries
//     await executeQuery(pool, userTable);
//     await executeQuery(pool, questionTable);
//     await executeQuery(pool, answerTable);

//     // Execute the ALTER TABLE query to add new columns
//     await executeQuery(pool, alterUserTable);

//     res.end(browserdisplay);
//   } catch (err) {
//     console.error("Error creating tables: ", err.message || err);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send("Error creating tables.");
//   } finally {
//     if (pool) pool.release();
//   }
// });

// // Function to execute a query
// async function executeQuery(pool, query) {
//   try {
//     console.log("Executing query:", query);
//     const [results] = await pool.query(query);
//     console.log(`Query executed successfully: ${query}`);
//     return results;
//   } catch (err) {
//     console.error("Query execution error:", err.message || err);
//     throw err;
//   }
// }
const express = require("express");
const route = express.Router();
const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Table creation route
route.get("/", async (req, res) => {
  let browserdisplay = "Tables have been created.";

  // SQL queries to create tables
  const userTable = `CREATE TABLE IF NOT EXISTS userTable (
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    resetToken VARCHAR(200),
    resetTokenExpiry BIGINT,
    PRIMARY KEY(userid)
  )`;

  const questionTable = `CREATE TABLE IF NOT EXISTS questionTable (
    questionid VARCHAR(200) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(questionid),
    FOREIGN KEY(userid) REFERENCES userTable(userid)
  )`;

  const answerTable = `CREATE TABLE IF NOT EXISTS answerTable (
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(200) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(questionid) REFERENCES questionTable(questionid),
    FOREIGN KEY(userid) REFERENCES userTable(userid)
  )`;

  let pool;

  try {
    pool = await dbconnection.getConnection();

    // Execute table creation queries
    await executeQuery(pool, userTable);
    await executeQuery(pool, questionTable);
    await executeQuery(pool, answerTable);

    res.end(browserdisplay);
  } catch (err) {
    console.error("Error creating tables: ", err.message || err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error creating tables.");
  } finally {
    if (pool) pool.release();
  }
});

// Function to execute a query
async function executeQuery(pool, query, params = []) {
  try {
    console.log("Executing query:", query);
    const [results] = await pool.query(query, params);
    console.log(`Query executed successfully: ${query}`);
    return results;
  } catch (err) {
    console.error("Query execution error:", err.message || err);
    throw err;
  }
}

module.exports = route;
