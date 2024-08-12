const express = require("express");
const route = express.Router();

const { postAnswer, fetchAnswer } = require("../controller/answerControll");
/***************API endpoint to post answer*************************/

route.post("/",postAnswer);


/***************API endpoint to fetch all Answer************************/

route.get("/:question_id", fetchAnswer);



module.exports = route