import { QUESTION_TYPES } from "../lib/surveyConstants";

export const QuestionProperties = ({ question, onUpdate }) => {
  const type = QUESTION_TYPES[question.type];
  if (!type) return null;

  const renderPropertyInput = (prop) => {
    switch (prop) {
      case "inputType":
        return (
          <div key={prop} className="flex items-center space-x-2">
            <label>Input Type:</label>
            <select
              value={question.properties.inputType}
              onChange={(e) => onUpdate("inputType", e.target.value)}
              className="p-2 border rounded pr-8 min-w-[80px]"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="url">URL</option>
            </select>
          </div>
        );
      case "placeholder":
        return (
          <div key={prop} className="flex items-center space-x-2">
            <label>Placeholder:</label>
            <input
              type="text"
              value={question.properties.placeholder}
              onChange={(e) => onUpdate("placeholder", e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Enter placeholder text"
            />
          </div>
        );
      case "ratingScale":
        return (
          <div key={prop} className="flex items-center space-x-2">
            <label>Rating Scale:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={question.properties.ratingScale}
              onChange={(e) =>
                onUpdate("ratingScale", parseInt(e.target.value))
              }
              className="p-2 border rounded w-20"
            />
          </div>
        );
      case "rows":
        return (
          <div key={prop} className="flex items-center space-x-2">
            <label>Number of Rows:</label>
            <input
              type="number"
              min="1"
              value={question.properties.rows}
              onChange={(e) => onUpdate("rows", parseInt(e.target.value))}
              className="p-2 border rounded w-20"
            />
          </div>
        );
      case "min":
      case "max":
      case "step":
        return (
          <div key={prop} className="flex items-center space-x-2">
            <label>{prop.charAt(0).toUpperCase() + prop.slice(1)}:</label>
            <input
              type="number"
              value={question.properties[prop]}
              onChange={(e) => onUpdate(prop, parseFloat(e.target.value))}
              className="p-2 border rounded w-20"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">{type.properties.map(renderPropertyInput)}</div>
  );
};
