import React from 'react';
import Card from '../common/Card';
import Markdown from '../common/Markdown';

const RadiologyResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {data.technique && (
        <Card title="Technique" className="bg-blue-50/30 dark:bg-blue-900/10 border-blue-200/40 dark:border-blue-800/30">
          <p className="text-sm text-stone-700 dark:text-stone-300">{data.technique}</p>
        </Card>
      )}

      {data.findings && data.findings.length > 0 && (
        <Card title="Findings">
          <ul className="space-y-2">
            {data.findings.map((finding, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1 text-xs">&#9679;</span>
                <div className="flex-1"><Markdown>{finding}</Markdown></div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {data.impressions && (
        <Card title="Impressions" className="bg-amber-50/30 dark:bg-amber-900/10 border-amber-200/40 dark:border-amber-800/30">
          <Markdown>{data.impressions}</Markdown>
        </Card>
      )}

      {data.recommendations && data.recommendations.length > 0 && (
        <Card title="Recommendations" className="bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-800/30">
          <ul className="space-y-2">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1 text-xs">&#9679;</span>
                <div className="flex-1"><Markdown>{recommendation}</Markdown></div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default RadiologyResults;
