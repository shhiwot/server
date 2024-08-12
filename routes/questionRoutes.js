const express = require("express");
const route = express.Router();
const {
  postNewQuestion,
  fetchQuestion,
  getSingleQuestion,
} = require("../controller/questionControll");


/***************API endpoint to fetch all questions************************/

route.get("/",fetchQuestion);


/************API endpoint to retrieve details of a specific question.*******************/

route.get("/:question_id", getSingleQuestion);


/********************API endpoint to create a new question.*****************************/

route.post("/", postNewQuestion);





module.exports = route;
