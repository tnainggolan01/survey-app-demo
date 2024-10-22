import { PlusCircle, Trash2 } from "lucide-react";
import { QUESTION_TYPES } from "../lib/surveyConstants";
import { QuestionProperties } from "./QuestionProperties";
import { ChoicesList } from "./ChoicesList";
import { Subquestion } from "./Subquestion";

export const Question = ({
  idx,
  question,
  onQuestionUpdate,
  onQuestionDelete,
  onQuestionPropertyUpdate,
  onChoiceAdd,
  onChoiceUpdate,
  onChoiceDelete,
  onSubquestionAdd,
  onConditionUpdate,
  onSubquestionDelete,
}) => {
  const type = QUESTION_TYPES[question.type];

  return (
    <div key={idx} className="border rounded p-4 space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Question"
          value={question.title}
          onChange={(e) => onQuestionUpdate("title", e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={question.type}
          onChange={(e) => onQuestionUpdate("type", e.target.value)}
          className="ml-2 p-2 pr-8 border rounded min-w-[140px]"
        >
          {Object.entries(QUESTION_TYPES).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={onQuestionDelete}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <QuestionProperties
        question={question}
        onUpdate={(prop, value) => onQuestionPropertyUpdate(prop, value)}
      />

      {type.hasChoices && (
        <ChoicesList
          choices={question.choices}
          onChoiceUpdate={onChoiceUpdate}
          onChoiceDelete={onChoiceDelete}
          onChoiceAdd={() => onChoiceAdd(null)}
        />
      )}

      {type.allowsSubquestions &&
        question.subquestions.map((subquestion, index) => {
          return (
            <Subquestion
              key={index}
              idx={index}
              subquestion={subquestion}
              parentType={question.type}
              parentChoices={question.choices}
              onSubquestionUpdate={(field, value) =>
                onQuestionUpdate(field, value, index)
              }
              onConditionUpdate={onConditionUpdate}
              onSubquestionDelete={onSubquestionDelete}
              onQuestionPropertyUpdate={onQuestionPropertyUpdate}
              onChoiceAdd={() => onChoiceAdd(index)}
              onChoiceUpdate={(choiceIndex, value) =>
                onChoiceUpdate(choiceIndex, value, index)
              }
              onChoiceDelete={(choiceIndex) =>
                onChoiceDelete(choiceIndex, index)
              }
            />
          );
        })}

      {type.allowsSubquestions &&
        (!type.hasChoices || question.choices.length > 0) && (
          <button
            onClick={onSubquestionAdd}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <PlusCircle size={20} className="mr-1" /> Add Subquestion
          </button>
        )}
    </div>
  );
};
