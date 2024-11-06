const express = require("express");
const router = express.Router();
const path = require("path");
const userAnswersController = require("../../controllers/userAnswersController")

router.route("/:user").get(userAnswersController.getAllAnswers)

module.exports = router;
