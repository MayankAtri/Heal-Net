import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { TEST_STATUS_COLORS } from '../../utils/constants';

const BloodTestResults = ({ results }) => {
  const getStatusBadge = (status) => {
    const colors = TEST_STATUS_COLORS[status?.toLowerCase()] || TEST_STATUS_COLORS.unknown;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold ${colors}`}>
        {status || 'Unknown'}
      </span>
    );
  };

  return (
    <Card title="Blood Test Results" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200/60 dark:divide-stone-800/60">
          <thead className="bg-stone-50/50 dark:bg-dark-surface/50">
            <tr>
              {['Test Name', 'Value', 'Reference Range', 'Status', 'Interpretation'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/40 dark:divide-stone-800/40">
            {results.map((test, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="hover:bg-stone-50/50 dark:hover:bg-dark-surface/50 transition-colors"
              >
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <div className="text-sm font-medium text-stone-900 dark:text-white">{test.testName}</div>
                  {test.unit && (
                    <div className="text-xs text-stone-400 dark:text-stone-500">{test.unit}</div>
                  )}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <div className="text-sm font-semibold text-stone-900 dark:text-white">{test.value}</div>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <div className="text-sm text-stone-500 dark:text-stone-400">{test.referenceRange || 'N/A'}</div>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  {getStatusBadge(test.status)}
                </td>
                <td className="px-5 py-3.5">
                  <div className="text-sm text-stone-600 dark:text-stone-300 max-w-md">
                    {test.interpretation || 'No interpretation available'}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {results.length === 0 && (
        <div className="text-center py-8 text-sm text-stone-500 dark:text-stone-400">
          No test results available
        </div>
      )}
    </Card>
  );
};

export default BloodTestResults;
