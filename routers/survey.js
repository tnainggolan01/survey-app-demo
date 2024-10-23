const express = require("express");
const router = express.Router();

// You'll add route handlers here in subsequent tasks
const {
  validate,
  getSurveys,
  getSurveyById,
  saveSurvey,
  updateSurvey,
  deleteSurvey,
} = require("../controller/survey");

router.get("/survey", getSurveys);
router.get("/survey/:id", getSurveyById);
router.post("/survey", validate("add-survey"), saveSurvey);
router.put("/survey/:id", validate("put-survey"), updateSurvey);
router.delete("/survey/:id", deleteSurvey);

// Export the router
module.exports = router;
