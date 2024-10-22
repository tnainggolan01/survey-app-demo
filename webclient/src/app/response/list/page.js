"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Header from "../../../components/Header";
import { getSurveyResponses } from "../../../api";

const ResponseItem = ({ response }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">{response.surveyType}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          href={`/survey/${response.surveyId}`}
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          {response.surveyName}
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{response.userId}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {response.metadata.completedAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          href={`/response/${response._id}`}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-flex items-center"
        >
          <Eye size={20} className="mr-1" /> View Response
        </Link>
      </td>
    </tr>
  );
};

export default function ResponseListPage() {
  const [responses, setResponses] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    error: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!responses.length) {
          const response = await getSurveyResponses();
          // console.log(response.data);
          setResponses(response.data);
          setIsReady(true);
        }
      } catch (error) {
        console.error("Error loading survey responses:", error);
        setSubmitStatus((prev) => ({
          ...prev,
          error: "Failed to load survey responses",
        }));
      }
    };
    fetch();
  }, []);

  if (submitStatus.error) {
    return (
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto border rounded-lg p-4 bg-white shadow">
          <div className="text-red-600">{submitStatus.error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Header />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Medical Questionnaire Response List</CardTitle>
        </CardHeader>
        {!isReady && (
          <div className="overflow-x-auto text-center py-8 text-gray-500">
            Loading response list...
          </div>
        )}
        {isReady && (
          <CardContent>
            {responses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Survey Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Survey Link
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User Id
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completed At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {responses.map((response, index) => (
                      <ResponseItem key={index} response={response} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                There is currently no Medical Questionnaire Response to display.
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
