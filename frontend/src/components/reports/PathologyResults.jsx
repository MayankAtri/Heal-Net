import React from 'react';
import Card from '../common/Card';
import Markdown from '../common/Markdown';

const PathologyResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {data.specimenType && (
        <Card title="Specimen Information" className="bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-800/30">
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">Specimen Type:</span>
              <span className="ml-2 text-sm text-stone-900 dark:text-white">{data.specimenType}</span>
            </div>
          </div>
        </Card>
      )}

      {data.macroscopicDescription && (
        <Card title="Macroscopic Description">
          <Markdown>{data.macroscopicDescription}</Markdown>
        </Card>
      )}

      {data.microscopicDescription && (
        <Card title="Microscopic Description">
          <Markdown>{data.microscopicDescription}</Markdown>
        </Card>
      )}

      {data.diagnosis && (
        <Card title="Diagnosis" className="bg-amber-50/30 dark:bg-amber-900/10 border-amber-200/40 dark:border-amber-800/30">
          <Markdown>{data.diagnosis}</Markdown>
        </Card>
      )}

      {data.comments && (
        <Card title="Pathologist Comments" className="bg-blue-50/30 dark:bg-blue-900/10 border-blue-200/40 dark:border-blue-800/30">
          <Markdown>{data.comments}</Markdown>
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

export default PathologyResults;
