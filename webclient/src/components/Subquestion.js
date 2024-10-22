import { Trash2 } from "lucide-react";
import { QUESTION_TYPES } from "../lib/surveyConstants";
import { QuestionProperties } from "./QuestionProperties";
import { ChoicesList } from "./ChoicesList";

const ConditionInput = ({
  idx,
  subquestion,
  parentChoices,
  parentType,
  onSubquestionUpdate,
  onConditionUpdate,
}) => {
  if (parentType === "rating" || parentType === "number") {
    return (
      <div className="space-y-2">
        <select
          value={subquestion.condition.operator}
          onChange={(e) =>
            onConditionUpdate(idx, e.target.value, subquestion.condition.value)
          }
          className="p-2 border rounded min-w-[140px]"
        >
          <option value="equal">Equal to</option>
          <option value="greater">Greater than</option>
          <option value="less">Less than</option>
        </select>
        <input
          type="number"
          value={subquestion.condition.value}
          onChange={(e) =>
            onConditionUpdate(
              idx,
              subquestion.condition.operator,
              e.target.value
            )
          }
          className="p-2 border rounded ml-2"
        />
      </div>
    );
  } else if (parentType === "boolean") {
    return (
      <select
        value={subquestion.condition.value}
        onChange={(e) => onConditionUpdate(idx, "equal", e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="">Select parent answer</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    );
  } else {
    return (
      <select
        value={subquestion.parentChoice}
        onChange={(e) => onSubquestionUpdate("parentChoice", e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="">Select parent answer</option>
        {parentChoices.map((choice, idx) => (
          <option key={idx} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    );
  }
};

export const Subquestion = ({
  idx,
  subquestion,
  parentType,
  parentChoices,
  onSubquestionUpdate,
  onConditionUpdate,
  onSubquestionDelete,
  onQuestionPropertyUpdate,
  onChoiceAdd,
  onChoiceUpdate,
  onChoiceDelete,
}) => {
  const type = QUESTION_TYPES[subquestion.type];

  return (
    <div key={idx} className="ml-6 border-l-2 pl-4 space-y-2">
      <ConditionInput
        idx={idx}
        subquestion={subquestion}
        parentChoices={parentChoices}
        parentType={parentType}
        onSubquestionUpdate={onSubquestionUpdate}
        onConditionUpdate={onConditionUpdate}
      />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Subquestion"
          value={subquestion.title}
          onChange={(e) => onSubquestionUpdate("title", e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={subquestion.type}
          onChange={(e) => onSubquestionUpdate("type", e.target.value)}
          className="ml-2 p-2 pr-8 border rounded min-w-[140px]"
        >
          {Object.entries(QUESTION_TYPES).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={() => onSubquestionDelete(idx)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <QuestionProperties
        question={subquestion}
        onUpdate={(prop, value) => onQuestionPropertyUpdate(prop, value, idx)}
      />

      {type.hasChoices && (
        <ChoicesList
          choices={subquestion.choices}
          onChoiceUpdate={onChoiceUpdate}
          onChoiceDelete={onChoiceDelete}
          onChoiceAdd={onChoiceAdd}
        />
      )}
    </div>
  );
};
