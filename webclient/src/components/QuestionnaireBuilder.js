import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Eye,
  Braces,
  Save,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Page } from "./Page";
import { generateSurveyJson } from "../lib/surveyUtils";
import {
  DEFAULT_PAGE_CONFIG,
  DEFAULT_QUESTION_CONFIG,
  DEFAULT_SUBQUESTION_CONFIG,
} from "../lib/surveyConstants";
import { saveSurvey } from "../api";

const QuestionnaireBuilder = ({ onGenerate, onPreview }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("Medical Questionnaire");
  const [surveyType, setSurveyType] = useState("pediatric");
  const [pages, setPages] = useState([DEFAULT_PAGE_CONFIG]);
  const [showModal, setShowModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ success: false, message: "" });

  const handleGenerate = (event) => {
    event.preventDefault();
    const json = generateSurveyJson(pages);
    onGenerate(json);
  };

  const handlePreview = (event) => {
    event.preventDefault();
    const json = generateSurveyJson(pages);
    onPreview(json);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isSave = event.nativeEvent.submitter.matches("#save-survey");
    if (isSave) {
      try {
        const survey = generateSurveyJson(pages);
        // Add metadata and create the data to send to the server
        let metadata = {
          name,
          type: surveyType,
          version: "1.0",
        };
        let data = {
          survey,
          metadata,
        };

        const response = await saveSurvey(data);
        setSaveStatus({
          success: true,
          message: "Survey saved successfully!",
        });
      } catch (error) {
        setSaveStatus({
          success: false,
          message: error.message || "Failed to save survey. Please try again.",
        });
      }
      setShowModal(true);
    }
  };

  return (
    <div className="space-y-0">
      <form
        onSubmit={handleFormSubmit}
        className="overflow-x-auto p-4 space-y-4"
      >
        <div className="border rounded-lg p-4 space-y-4 bg-white shadow">
          <input
            type="text"
            placeholder="Survey Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl font-semibold p-2 border rounded w-full"
            required
          />
          <select
            value={surveyType}
            onChange={(e) => setSurveyType(e.target.value)}
            className="p-2 border rounded w-full"
            required
          >
            <option value="pediatric">Pediatric Assessment</option>
            <option value="internist">Internal Medicine Assessment</option>
            <option value="healthcheck">Health Check-up Examination</option>
            <option value="vaccination">Vaccination Visit</option>
            <option value="followup">Follow-up Visit</option>
            <option value="general">General Medical Survey</option>
          </select>
        </div>
        <div className="border rounded-lg p-4 space-y-4 bg-white shadow">
          <input
            type="text"
            placeholder="Survey Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold p-2 border rounded w-full"
            required
          />
        </div>
        {pages.map((page, index) => (
          <Page
            key={index}
            page={page}
            // Add Page handler is covered in the Add Page button down below
            onPageUpdate={(field, value) => {
              const newPages = [...pages];
              newPages[index][field] = value;
              setPages(newPages);
            }}
            onPageDelete={() => {
              if (pages.length > 1) {
                setPages(pages.filter((_, i) => i !== index));
              }
            }}
            onQuestionAdd={() => {
              const newPages = [...pages];
              newPages[index].questions.push(DEFAULT_QUESTION_CONFIG);
              setPages(newPages);
            }}
            // This update function covers the value update of a field for both Question and Subquestion
            onQuestionUpdate={(
              questionIndex,
              field,
              value,
              subquestionIndex = null
            ) => {
              const newPages = [...pages];
              let question =
                subquestionIndex !== null
                  ? newPages[index].questions[questionIndex].subquestions[
                      subquestionIndex
                    ]
                  : newPages[index].questions[questionIndex];
              question[field] = value;
              setPages(newPages);
            }}
            onQuestionDelete={(questionIndex) => {
              const newPages = [...pages];
              if (newPages[index].questions.length > 1) {
                newPages[index].questions = newPages[index].questions.filter(
                  (_, i) => i !== questionIndex
                );
                setPages(newPages);
              }
            }}
            // This update function covers the value update of a property for both Question and Subquestion
            onQuestionPropertyUpdate={(
              questionIndex,
              property,
              value,
              subquestionIndex = null
            ) => {
              const newPages = [...pages];
              const question =
                subquestionIndex !== null
                  ? newPages[index].questions[questionIndex].subquestions[
                      subquestionIndex
                    ]
                  : newPages[index].questions[questionIndex];
              question.properties[property] = value;
              setPages(newPages);
            }}
            onChoiceAdd={(questionIndex, subquestionIndex = null) => {
              const newPages = [...pages];
              const question =
                subquestionIndex !== null
                  ? newPages[index].questions[questionIndex].subquestions[
                      subquestionIndex
                    ]
                  : newPages[index].questions[questionIndex];
              question.choices.push("");
              setPages(newPages);
            }}
            onChoiceUpdate={(
              questionIndex,
              choiceIndex,
              value,
              subquestionIndex = null
            ) => {
              const newPages = [...pages];
              const question =
                subquestionIndex !== null
                  ? newPages[index].questions[questionIndex].subquestions[
                      subquestionIndex
                    ]
                  : newPages[index].questions[questionIndex];
              question.choices[choiceIndex] = value;
              setPages(newPages);
            }}
            onChoiceDelete={(
              questionIndex,
              choiceIndex,
              subquestionIndex = null
            ) => {
              const newPages = [...pages];
              const question =
                subquestionIndex !== null
                  ? newPages[index].questions[questionIndex].subquestions[
                      subquestionIndex
                    ]
                  : newPages[index].questions[questionIndex];
              question.choices = question.choices.filter(
                (_, i) => i !== choiceIndex
              );
              setPages(newPages);
            }}
            onSubquestionAdd={(questionIndex) => {
              const newPages = [...pages];
              newPages[index].questions[questionIndex].subquestions.push(
                DEFAULT_SUBQUESTION_CONFIG
              );
              setPages(newPages);
            }}
            onConditionUpdate={(
              questionIndex,
              subquestionIndex,
              operator,
              value
            ) => {
              const newPages = [...pages];
              let question =
                newPages[index].questions[questionIndex].subquestions[
                  subquestionIndex
                ];
              question.condition = { operator, value };
              setPages(newPages);
            }}
            onSubquestionDelete={(questionIndex, subquestionIndex) => {
              const newPages = [...pages];
              newPages[index].questions[questionIndex].subquestions = newPages[
                index
              ].questions[questionIndex].subquestions.filter(
                (_, i) => i !== subquestionIndex
              );
              setPages(newPages);
            }}
          />
        ))}

        <div className="flex space-x-4">
          <button
            onClick={() =>
              // Add a Page
              setPages([...pages, DEFAULT_PAGE_CONFIG])
            }
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <PlusCircle size={20} className="mr-1" /> Add Page
          </button>
          <button
            onClick={handleGenerate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <Braces className="mr-1" /> Preview JSON
          </button>
          <button
            onClick={handlePreview}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center"
          >
            <Eye className="mr-1" /> Preview Survey
          </button>
          <button
            type="submit"
            id="save-survey"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center"
          >
            <Save className="mr-1" /> Save
          </button>
        </div>
      </form>

      {/* Modal Backdrop */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all">
            <div className="flex items-center justify-center mb-4">
              {saveStatus.success ? (
                <CheckCircle className="h-12 w-12 text-green-500" />
              ) : (
                <XCircle className="h-12 w-12 text-red-500" />
              )}
            </div>

            <h3
              className={`text-lg font-medium text-center mb-4 ${
                saveStatus.success ? "text-green-700" : "text-red-700"
              }`}
            >
              {saveStatus.success ? "Success!" : "Error"}
            </h3>

            <p className="text-gray-600 text-center mb-6">
              {saveStatus.message}
            </p>

            <div className="flex justify-center">
              {saveStatus.success ? (
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireBuilder;
