export const DEFAULT_PAGE_CONFIG = {
  title: "",
  questions: [
    {
      title: "",
      type: "text",
      choices: [],
      subquestions: [],
      properties: {
        inputType: "text",
        placeholder: "",
        ratingScale: 5,
        rows: 3,
        min: 0,
        max: 100,
        step: 1,
      },
    },
  ],
};

export const DEFAULT_QUESTION_CONFIG = {
  title: "",
  type: "text",
  choices: [],
  subquestions: [],
  properties: {
    inputType: "text",
    placeholder: "",
    ratingScale: 5,
    rows: 3,
    min: 0,
    max: 100,
    step: 1,
  },
};

export const DEFAULT_SUBQUESTION_CONFIG = {
  title: "",
  type: "text",
  choices: [],
  parentChoice: "",
  properties: {
    inputType: "text",
    placeholder: "",
    ratingScale: 5,
    rows: 3,
    min: 0,
    max: 100,
    step: 1,
  },
  condition: {
    operator: "equal",
    value: "",
  },
};

export const QUESTION_TYPES = {
  text: {
    label: "Text Input",
    hasChoices: false,
    allowsSubquestions: false,
    properties: ["inputType", "placeholder"],
  },
  radiogroup: {
    label: "Radio Button",
    hasChoices: true,
    allowsSubquestions: true,
    properties: [],
  },
  checkbox: {
    label: "Checkbox",
    hasChoices: true,
    allowsSubquestions: true,
    properties: [],
  },
  dropdown: {
    label: "Dropdown",
    hasChoices: true,
    allowsSubquestions: true,
    properties: [],
  },
  date: {
    label: "Date",
    hasChoices: false,
    allowsSubquestions: false,
    properties: [],
  },
  rating: {
    label: "Rating",
    hasChoices: false,
    allowsSubquestions: true,
    properties: ["ratingScale"],
  },
  boolean: {
    label: "Yes/No",
    hasChoices: false,
    allowsSubquestions: true,
    properties: [],
  },
  number: {
    label: "Number",
    hasChoices: false,
    allowsSubquestions: true,
    properties: ["min", "max", "step"],
  },
  comment: {
    label: "Text Box",
    hasChoices: false,
    allowsSubquestions: false,
    properties: ["rows"],
  },
};
