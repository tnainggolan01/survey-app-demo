const conn = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getSurveys = async () =>
  await conn.getDb().collection("surveys").find({}).limit(50).toArray();

const getSurveyById = async (id) => {
  // console.log("services/getAccountById:", id);
  return await conn
    .getDb()
    .collection("surveys")
    .findOne({ _id: new ObjectId(id) });
};

const saveSurvey = async (survey) => {
  survey.createdAt = new Date(Date.now()).toUTCString();
  const response = await conn.getDb().collection("surveys").insertOne(survey);
  // console.log("services/saveSurvey:", response);
  return { ...survey, _id: response.insertedId.toString() };
};

const updateSurvey = async (id, updated) =>
  await conn
    .getDb()
    .collection("surveys")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...updated } });

const deleteSurvey = async (id) => {
  // console.log("services/deleteSurvey:", id);
  return await conn
    .getDb()
    .collection("surveys")
    .deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  getSurveys,
  getSurveyById,
  saveSurvey,
  updateSurvey,
  deleteSurvey,
};
