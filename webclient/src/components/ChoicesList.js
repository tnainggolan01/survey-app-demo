import { PlusCircle, Trash2 } from "lucide-react";

export const ChoicesList = ({
  choices,
  onChoiceUpdate,
  onChoiceDelete,
  onChoiceAdd,
}) => (
  <div className="space-y-2">
    <h4 className="font-medium">Choices:</h4>
    {choices.map((choice, index) => (
      <div key={index} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={`Choice ${index + 1}`}
          value={choice}
          onChange={(e) => onChoiceUpdate(index, e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={() => onChoiceDelete(index)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    ))}
    <button
      onClick={onChoiceAdd}
      className="text-blue-500 hover:text-blue-700 flex items-center"
    >
      <PlusCircle size={20} className="mr-1" /> Add Choice
    </button>
  </div>
);
