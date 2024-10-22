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

router.get("/api/survey", getSurveys);
router.get("/api/survey/:id", getSurveyById);
router.post("/api/survey", validate("add-survey"), saveSurvey);
router.put("/api/survey/:id", validate("put-survey"), updateSurvey);
router.delete("/api/survey/:id", deleteSurvey);

// Export the router
module.exports = router;
