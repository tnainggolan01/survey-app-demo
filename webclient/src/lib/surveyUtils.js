import { QUESTION_TYPES } from "./surveyConstants";

const generateQuestionProperties = (question) => {
  const props = {};
  const type = QUESTION_TYPES[question.type];

  if (!type) return props;

  switch (question.type) {
    case "text":
      props.inputType = question.properties.inputType;
      if (question.properties.placeholder) {
        props.placeholder = question.properties.placeholder;
      }
      break;
    case "date":
      props.inputType = "date";
      break;
    case "rating":
      props.rateMax = question.properties.ratingScale;
      break;
    case "comment":
      props.rows = question.properties.rows;
      break;
    case "number":
      props.inputType = "number";
      props.min = question.properties.min;
      props.max = question.properties.max;
      props.step = question.properties.step;
      break;
  }

  return props;
};

export const generateSurveyJson = (pages) => {
  const processSubquestion = (sub, parentQuestion) => {
    const visibleIf = (() => {
      switch (parentQuestion.type) {
        case "rating":
        case "number":
          return `{${parentQuestion.name}} ${
            sub.condition.operator === "equal"
              ? "="
              : sub.condition.operator === "greater"
              ? ">"
              : "<"
          } ${sub.condition.value}`;
        case "boolean":
          return `{${parentQuestion.name}} = ${sub.condition.value}`;
        case "checkbox":
          return `{${parentQuestion.name}} contains '${sub.parentChoice}'`;
        case "text":
          if (parentQuestion.inputType === "number") {
            return `{${parentQuestion.name}} ${
              sub.condition.operator === "equal"
                ? "="
                : sub.condition.operator === "greater"
                ? ">"
                : "<"
            } ${sub.condition.value}`;
          }
        default:
          return `{${parentQuestion.name}} = '${sub.parentChoice}'`;
      }
    })();

    return {
      type: sub.type === "date" || sub.type === "number" ? "text" : sub.type,
      name: sub.title.toLowerCase().replace(/\s+/g, "_"),
      title: sub.title,
      ...(QUESTION_TYPES[sub.type].hasChoices && {
        choices: sub.choices.filter(Boolean),
      }),
      ...generateQuestionProperties(sub),
      visibleIf,
    };
  };

  return {
    title: "Medical Questionnaire",
    showProgressBar: "top",
    pages: pages.map((page) => ({
      title: page.title,
      questions: page.questions
        .map((question) => {
          const baseQuestion = {
            type:
              question.type === "date" || question.type === "number"
                ? "text"
                : question.type,
            name: question.title.toLowerCase().replace(/\s+/g, "_"),
            title: question.title,
            ...generateQuestionProperties(question),
          };

          if (QUESTION_TYPES[question.type].hasChoices) {
            baseQuestion.choices = question.choices.filter(Boolean);
          }

          if (question.subquestions.length > 0) {
            return [
              baseQuestion,
              ...question.subquestions.map((sub) =>
                processSubquestion(sub, baseQuestion)
              ),
            ];
          }
          return baseQuestion;
        })
        .flat(),
    })),
  };
};
