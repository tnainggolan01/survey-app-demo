"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getSurveyResponseById } from "../../../api";
import Header from "../../../components/Header";
import JsonViewer from "../../../components/JsonViewer";
import "survey-react/survey.css";
import "survey-core/defaultV2.min.css";

export default function SurveyPage() {
  const { id } = useParams();
  const [surveyJson, setSurveyJson] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    error: null,
    success: false,
  });

  useEffect(() => {
    const fetch = async () => {
      if (!surveyJson) {
        try {
          const response = await getSurveyResponseById(id);
          const surveyJson = response.data;
          // console.log(surveyJson);
          setSurveyJson(surveyJson);
        } catch (error) {
          console.error("Error fetching response:", error);
          setSubmitStatus((prev) => ({
            ...prev,
            error: "Failed to load response",
          }));
        }
      }
    };
    fetch();
  }, [id]);

  if (submitStatus.error) {
    return (
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto border rounded-lg p-4 bg-white shadow">
          <div className="text-red-600">{submitStatus.error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Header />
      <h1 className="text-3xl font-bold mb-6">
        Medical Questionnaire Response
      </h1>
      {surveyJson && <JsonViewer json={surveyJson} />}
    </div>
  );
}
