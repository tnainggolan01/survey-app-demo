import { useState } from "react";
import { Copy, Check } from "lucide-react";

const JsonViewer = ({ json }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(json, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Generated SurveyJS JSON</h2>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
        >
          {copied ? (
            <Check size={20} className="text-green-500" />
          ) : (
            <Copy size={20} />
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className="bg-gray-50 p-4 rounded overflow-x-auto">
        {JSON.stringify(json, null, 2)}
      </pre>
    </div>
  );
};

export default JsonViewer;
