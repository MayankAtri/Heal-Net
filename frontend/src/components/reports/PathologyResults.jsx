import React from 'react';
import Card from '../common/Card';
import Markdown from '../common/Markdown';

const PathologyResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Specimen Information */}
      {data.specimenType && (
        <Card title="Specimen Information" className="bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700">
          <div className="space-y-2">
            <div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Specimen Type:</span>
              <span className="ml-2 text-sm text-gray-900 dark:text-white">{data.specimenType}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Macroscopic Description */}
      {data.macroscopicDescription && (
        <Card title="Macroscopic Description" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <Markdown>{data.macroscopicDescription}</Markdown>
        </Card>
      )}

      {/* Microscopic Description */}
      {data.microscopicDescription && (
        <Card title="Microscopic Description" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <Markdown>{data.microscopicDescription}</Markdown>
        </Card>
      )}

      {/* Diagnosis */}
      {data.diagnosis && (
        <Card title="Diagnosis" className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
          <Markdown>{data.diagnosis}</Markdown>
        </Card>
      )}

      {/* Comments */}
      {data.comments && (
        <Card title="Pathologist Comments" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <Markdown>{data.comments}</Markdown>
        </Card>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <Card title="Recommendations" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
          <ul className="space-y-2">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <div className="flex-1"><Markdown>{recommendation}</Markdown></div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default PathologyResults;
