import { Survey } from "survey-react-ui";
import { Model, StylesManager } from "survey-core";
import { SharpLight } from "survey-core/themes";
import { json } from "../lib/surveyJson";
import "survey-react/survey.css";
import "survey-core/defaultV2.min.css";

const SurveyComponent = () => {
  const survey = new Model(json);
  survey.applyTheme(SharpLight);

  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  return <Survey model={survey} />;
};

export default SurveyComponent;
