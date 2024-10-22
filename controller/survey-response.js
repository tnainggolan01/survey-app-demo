const service = require("../services/survey-response");

const { body, validationResult } = require("express-validator");
const validate = (method) => {
  switch (method) {
    case "add-response": {
      return [
        body("surveyId", "Response's survey id is not found").exists(),
        body("surveyType", "Response's survey type is not found").exists(),
        body("response", "Survey response is not found").exists(),
        body("metadata", "Response's metadata is not found").exists(),
      ];
    }
  }
};

const getSurveyResponses = async (req, res, next) => {
  try {
    res.send(await service.getSurveyResponses());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getSurveyResponseById = async (req, res, next) => {
  try {
    res.send(await service.getSurveyResponseById(req.params.id));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const saveSurveyResponse = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    res.send(await service.saveSurveyResponse(req.body));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  validate,
  getSurveyResponses,
  getSurveyResponseById,
  saveSurveyResponse,
};
