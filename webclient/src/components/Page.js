import { PlusCircle, Trash2 } from "lucide-react";
import { Question } from "./Question";

export const Page = ({
  page,
  onPageUpdate,
  onPageDelete,
  onQuestionAdd,
  onQuestionUpdate,
  onQuestionDelete,
  onQuestionPropertyUpdate,
  onChoiceAdd,
  onChoiceUpdate,
  onChoiceDelete,
  onSubquestionAdd,
  onConditionUpdate,
  onSubquestionDelete,
}) => (
  <div className="border rounded-lg p-4 space-y-4 bg-white shadow">
    <div className="flex items-center justify-between">
      <input
        type="text"
        placeholder="Page Title"
        value={page.title}
        onChange={(e) => onPageUpdate("title", e.target.value)}
        className="text-xl font-semibold p-2 border rounded w-full"
      />
      <button
        onClick={onPageDelete}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>
    </div>

    {page.questions.map((question, index) => (
      <Question
        key={index}
        idx={index}
        question={question}
        onQuestionUpdate={(field, value, subquestionIndex = null) =>
          onQuestionUpdate(index, field, value, subquestionIndex)
        }
        onQuestionDelete={() => onQuestionDelete(index)}
        onQuestionPropertyUpdate={(property, value, subquestionIndex = null) =>
          onQuestionPropertyUpdate(index, property, value, subquestionIndex)
        }
        onChoiceAdd={(subquestionIndex = null) =>
          onChoiceAdd(index, subquestionIndex)
        }
        onChoiceUpdate={(choiceIndex, value, subquestionIndex = null) =>
          onChoiceUpdate(index, choiceIndex, value, subquestionIndex)
        }
        onChoiceDelete={(choiceIndex, subquestionIndex = null) =>
          onChoiceDelete(index, choiceIndex, subquestionIndex)
        }
        onSubquestionAdd={() => onSubquestionAdd(index)}
        onConditionUpdate={(subquestionIndex, operator, value) =>
          onConditionUpdate(index, subquestionIndex, operator, value)
        }
        onSubquestionDelete={(subquestionIndex) =>
          onSubquestionDelete(index, subquestionIndex)
        }
      />
    ))}

    <button
      onClick={onQuestionAdd}
      className="text-blue-500 hover:text-blue-700 flex items-center"
    >
      <PlusCircle size={20} className="mr-1" /> Add Question
    </button>
  </div>
);
