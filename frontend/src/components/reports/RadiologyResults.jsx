import React from 'react';
import Card from '../common/Card';

const RadiologyResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Technique */}
      {data.technique && (
        <Card title="Technique" className="bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-800">{data.technique}</p>
        </Card>
      )}

      {/* Findings */}
      {data.findings && data.findings.length > 0 && (
        <Card title="Findings">
          <ul className="space-y-2">
            {data.findings.map((finding, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary-500 mt-1">•</span>
                <span className="text-gray-800">{finding}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Impressions */}
      {data.impressions && (
        <Card title="Impressions" className="bg-yellow-50 border-yellow-200">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 whitespace-pre-line font-medium">{data.impressions}</p>
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

export default RadiologyResults;
