import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Questionnaire Builder APIs
export const getSurveys = () => api.get("/survey");
export const getSurveyById = (id) => api.get(`/survey/${id}`);
export const saveSurvey = (post) => api.post("/survey", post);
export const deleteSurvey = (id) => api.delete(`/survey/${id}`);

// Questionnaire Response APIs
export const getSurveyResponses = () => api.get("/survey-response");
export const getSurveyResponseById = (id) => api.get(`/survey-response/${id}`);
export const saveSurveyResponse = (post) => api.post("/survey-response", post);
