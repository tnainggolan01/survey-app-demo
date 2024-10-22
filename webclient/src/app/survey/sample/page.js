"use client";

import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import { SharpLight } from "survey-core/themes";
import "survey-react/survey.css";
import "survey-core/defaultV2.min.css";
import { json } from "../../../lib/surveyJson";

export default function SurveyPage() {
  const survey = new Model(json);
  survey.applyTheme(SharpLight);
  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  return (
    <div className="container mx-auto p-6">
      <div className="border rounded-lg p-4 bg-white shadow">
        <Survey model={survey} />
      </div>
    </div>
  );
}
