const conn = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getSurveyResponses = async () =>
  await conn
    .getDb()
    .collection("survey-responses")
    .find({})
    .limit(50)
    .toArray();

const getSurveyResponseById = async (id) => {
  // console.log("services/getSurveyResponseById:", id);
  return await conn
    .getDb()
    .collection("survey-responses")
    .findOne({ _id: new ObjectId(id) });
};

const saveSurveyResponse = async (survey) => {
  survey.createdAt = new Date(Date.now()).toUTCString();
  const response = await conn
    .getDb()
    .collection("survey-responses")
    .insertOne(survey);
  // console.log("services/saveSurveyResponse:", response);
  return { ...survey, _id: response.insertedId.toString() };
};

module.exports = {
  getSurveyResponses,
  getSurveyResponseById,
  saveSurveyResponse,
};
