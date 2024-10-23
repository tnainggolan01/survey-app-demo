const express = require("express");
const router = express.Router();

// You'll add route handlers here in subsequent tasks
const {
  validate,
  getSurveyResponses,
  getSurveyResponseById,
  saveSurveyResponse,
} = require("../controller/survey-response");

router.get("/survey-response", getSurveyResponses);
router.get("/survey-response/:id", getSurveyResponseById);
router.post("/survey-response", validate("add-response"), saveSurveyResponse);

// Export the router
module.exports = router;
