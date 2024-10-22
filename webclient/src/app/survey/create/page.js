"use client";

import { useState, useEffect } from "react";
import { Survey, Model } from "survey-react";
import { SharpLight } from "survey-core/themes";
import Header from "../../../components/Header";
import QuestionnaireBuilder from "../../../components/QuestionnaireBuilder";
import JsonViewer from "../../../components/JsonViewer";
import "survey-react/survey.css";
import "survey-core/defaultV2.min.css";

export default function CreatePage() {
  const [surveyJson, setSurveyJson] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [surveyModel, setSurveyModel] = useState(null);

  useEffect(() => {
    if (surveyJson) {
      const model = new Model(surveyJson);
      model.applyTheme(SharpLight);
      setSurveyModel(model);
    }
  }, [surveyJson]);

  const handleSurveyGenerate = (json) => {
    setSurveyJson(json);
    setShowPreview(false);
  };

  const handlePreview = (json) => {
    setSurveyJson(json);
    setShowPreview(true);
  };

  const handleSurveyComplete = (sender) => {
    console.log(JSON.stringify(sender.data, null, 3));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Medical Questionnaire Builder</h1>
      <div className="grid gap-8">
        <QuestionnaireBuilder
          onGenerate={handleSurveyGenerate}
          onPreview={handlePreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
        />
        {!showPreview ? (
          surveyJson && <JsonViewer json={surveyJson} />
        ) : (
          <div className="border rounded-lg p-4 bg-white shadow">
            <Survey model={surveyModel} onComplete={handleSurveyComplete} />
          </div>
        )}
      </div>
    </div>
  );
}
