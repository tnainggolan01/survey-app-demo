"use client";

import { useState, useEffect } from "react";
import { getSurveys } from "../../../api";
import Header from "../../../components/Header";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, PlusCircle } from "lucide-react";

const SurveyItem = ({ survey }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">{survey.metadata.type}</td>
      <td className="px-6 py-4 whitespace-nowrap">{survey.metadata.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{survey.createdAt}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          href={`/survey/${survey._id}`}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-flex items-center"
        >
          <Eye size={20} className="mr-1" /> View
        </Link>
      </td>
    </tr>
  );
};

export default function SurveyListPage() {
  const [surveys, setSurveys] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    error: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!surveys.length) {
          const response = await getSurveys();
          // console.log(response.data);
          setSurveys(response.data);
          setIsReady(true);
        }
      } catch (error) {
        console.error("Error fetching survey response:", error);
        setSubmitStatus((prev) => ({
          ...prev,
          error: "Failed to load survey",
        }));
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Header />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Medical Questionnaire List</CardTitle>
          <Link
            href="/survey/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
          >
            <PlusCircle size={20} className="mr-1" /> Create New
          </Link>
        </CardHeader>
        {!isReady && (
          <div className="overflow-x-auto text-center py-8 text-gray-500">
            Loading response list...
          </div>
        )}
        {isReady && (
          <CardContent>
            {surveys.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {surveys.map((survey, index) => (
                      <SurveyItem key={index} survey={survey} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                There is currently no Medical Questionnaire to display.
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
