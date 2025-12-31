import React from 'react';
import Card from '../common/Card';

const PathologyResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Specimen Information */}
      {data.specimenType && (
        <Card title="Specimen Information" className="bg-purple-50 border-purple-200">
          <div className="space-y-2">
            <div>
              <span className="text-sm font-bold text-gray-700">Specimen Type:</span>
              <span className="ml-2 text-sm text-gray-900">{data.specimenType}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Macroscopic Description */}
      {data.macroscopicDescription && (
        <Card title="Macroscopic Description">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-line">{data.macroscopicDescription}</p>
          </div>
        </Card>
      )}

      {/* Microscopic Description */}
      {data.microscopicDescription && (
        <Card title="Microscopic Description">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-line">{data.microscopicDescription}</p>
          </div>
        </Card>
      )}

      {/* Diagnosis */}
      {data.diagnosis && (
        <Card title="Diagnosis" className="bg-yellow-50 border-yellow-200">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-line font-medium">{data.diagnosis}</p>
          </div>
        </Card>
      )}

      {/* Comments */}
      {data.comments && (
        <Card title="Pathologist Comments" className="bg-blue-50 border-blue-200">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-line">{data.comments}</p>
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <Card title="Recommendations" className="bg-green-50 border-green-200">
          <ul className="space-y-2">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span className="text-gray-800">{recommendation}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default PathologyResults;
