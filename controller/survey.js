const service = require("../services/survey");

const { body, validationResult } = require("express-validator");
const validate = (method) => {
  switch (method) {
    case "add-survey":
    case "put-survey": {
      return [
        body("survey", "Survey json field is not found").exists(),
        body("metadata", "Survey metadata field is not found").exists(),
      ];
    }
  }
};

const getSurveys = async (req, res, next) => {
  try {
    res.send(await service.getSurveys());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getSurveyById = async (req, res, next) => {
  try {
    res.send(await service.getSurveyById(req.params.id));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const saveSurvey = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    res.send(await service.saveSurvey(req.body));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateSurvey = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    res.send(await service.updateSurvey(req.params.id, req.body));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteSurvey = async (req, res, next) => {
  try {
    res.send(await service.deleteSurvey(req.params.id));
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  validate,
  getSurveys,
  getSurveyById,
  saveSurvey,
  updateSurvey,
  deleteSurvey,
};
