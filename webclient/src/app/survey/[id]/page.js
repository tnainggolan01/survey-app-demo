"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Survey, Model } from "survey-react";
import { SharpLight } from "survey-core/themes";
import { getSurveyById, saveSurveyResponse } from "../../../api";
import "survey-react/survey.css";
import "survey-core/defaultV2.min.css";

export default function SurveyPage() {
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);
  const [surveyModel, setSurveyModel] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    error: null,
    success: false,
  });

  useEffect(() => {
    const fetch = async () => {
      if (!surveyModel) {
        try {
          const response = await getSurveyById(id);
          const surveyJson = response.data.survey;
          // console.log(surveyJson);

          const model = new Model(surveyJson);
          model.applyTheme(SharpLight);

          // Add start time to the model
          model.startTime = new Date();

          // Add survey metadata to the model
          model.surveyId = id;
          model.surveyType = response.data.metadata?.type || "N/A";
          model.surveyName = response.data.metadata?.name || "N/A";
          model.version = surveyJson.metadata?.version || "N/A";

          setSurveyModel(model);
          setIsReady(true);
        } catch (error) {
          console.error("Error fetching survey:", error);
          setSubmitStatus((prev) => ({
            ...prev,
            error: "Failed to load survey",
          }));
        }
      }
    };
    fetch();
  }, [id]);

  const handleSurveyComplete = async (sender) => {
    // console.log(JSON.stringify(sender.data, null, 3));
    setSubmitStatus((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // Calculate time spent
      const endTime = new Date();
      const timeSpentMs = endTime - sender.startTime;
      // const timeSpentMinutes = parseFloat((timeSpentMs / (1000 * 60)).toFixed(2));

      // Prepare the response data
      const responseData = {
        surveyId: sender.surveyId,
        surveyType: sender.surveyType,
        surveyName: sender.surveyName,
        userId: "N/A", // May add user ID if there is one
        response: sender.data,
        metadata: {
          completedAt: endTime.toISOString(),
          timeSpentMs,
          // timeSpentMinutes,
          surveyVersion: sender.version,
          userAgent: window.navigator.userAgent,
          language: window.navigator.language,
        },
      };

      // Submit the response
      await saveSurveyResponse(responseData);

      setSubmitStatus({
        isSubmitting: false,
        error: null,
        success: true,
      });

      // May add redirecting to thank you page such as below
      // router.push(`/survey/${id}/thank-you`);
    } catch (error) {
      console.error("Error submitting survey:", error);
      setSubmitStatus({
        isSubmitting: false,
        error: "Failed to submit survey. Please try again.",
        success: false,
      });
    }
  };

  if (submitStatus.error) {
    return (
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto border rounded-lg p-4 bg-white shadow">
          <div className="text-red-600">{submitStatus.error}</div>
        </div>
      </div>
    );
  }

  if (submitStatus.success) {
    return (
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto border rounded-lg p-4 bg-white shadow">
          <div className="text-green-600">
            Thank you for completing the survey!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto border rounded-lg p-4 bg-white shadow">
        {submitStatus.isSubmitting && (
          <div className="text-blue-600">Submitting your responses...</div>
        )}
        {isReady && !submitStatus.isSubmitting && (
          <Survey model={surveyModel} onComplete={handleSurveyComplete} />
        )}
      </div>
    </div>
  );
}
