export const json = {
  title: "Medical Questionnaire",
  showProgressBar: "top",
  pages: [
    {
      title: "Symptoms",
      questions: [
        {
          type: "checkbox",
          name: "symptoms",
          title: "What symptoms are you experiencing?",
          isRequired: true,
          choices: [
            "Fever",
            "Cough",
            "Shortness of breath",
            "Fatigue",
            "Loss of taste or smell",
            "Headache",
            "Sore throat",
          ],
        },
        {
          type: "boolean",
          name: "isBad",
          title: "Is it bad?",
          isRequired: true,
          visibleIf: "{symptoms} contains 'Fever'",
        },
        {
          type: "text",
          name: "q3",
          title: "Q3",
          inputType: "date",
        },
        {
          type: "text",
          name: "test",
          title: "Test",
          min: 30,
          max: 50,
          step: 0.1,
          inputType: "number",
        },
      ],
    },
    {
      title: "Fever Details",
      visibleIf: "{symptoms} contains 'Fever'",
      questions: [
        {
          type: "text",
          name: "feverTemperature",
          title: "What is your current temperature?",
          inputType: "number",
          isRequired: true,
        },
        {
          type: "radiogroup",
          name: "feverFrequency",
          title: "How often do you experience fever?",
          isRequired: true,
          choices: [
            "Constantly",
            "Several times a day",
            "Once a day",
            "Every few days",
          ],
        },
      ],
    },
    {
      title: "Cough Details",
      visibleIf: "{symptoms} contains 'Cough'",
      questions: [
        {
          type: "radiogroup",
          name: "coughType",
          title: "What type of cough do you have?",
          isRequired: true,
          choices: ["Dry cough", "Wet cough (produces phlegm)", "Both"],
        },
        {
          type: "radiogroup",
          name: "coughFrequency",
          title: "How often do you cough?",
          isRequired: true,
          choices: [
            "Constantly",
            "Several times an hour",
            "A few times a day",
            "Occasionally",
          ],
        },
      ],
    },
  ],
};
