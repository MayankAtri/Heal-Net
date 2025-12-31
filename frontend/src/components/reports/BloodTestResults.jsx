import React from 'react';
import Card from '../common/Card';
import { TEST_STATUS_COLORS } from '../../utils/constants';

const BloodTestResults = ({ results }) => {
  const getStatusBadge = (status) => {
    const colors = TEST_STATUS_COLORS[status?.toLowerCase()] || TEST_STATUS_COLORS.unknown;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colors}`}>
        {status || 'Unknown'}
      </span>
    );
  };

  return (
    <Card title="Blood Test Results" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Test Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Reference Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Interpretation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((test, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{test.testName}</div>
                  {test.unit && (
                    <div className="text-xs text-gray-500">Unit: {test.unit}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">{test.value}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{test.referenceRange || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(test.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700 max-w-md">
                    {test.interpretation || 'No interpretation available'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {results.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No test results available
        </div>
      )}
    </Card>
  );
};

export default BloodTestResults;
