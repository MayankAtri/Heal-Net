import React, { useState } from 'react';

const MedicineRecommendation = ({ medicine, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-green-300 dark:hover:border-green-600">
      <div className="space-y-3">
        {/* Medicine Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-medical text-white flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{medicine.name}</h3>
            </div>
            {medicine.activeIngredient && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 ml-10">
                Active: {medicine.activeIngredient}
              </p>
            )}
          </div>
        </div>

        {/* Dosage Information */}
        <div className="ml-10 space-y-2">
          {medicine.dosage && (
            <div className="flex items-center space-x-2">
              <span className="text-xl">💊</span>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Dosage</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{medicine.dosage}</p>
              </div>
            </div>
          )}

          {medicine.frequency && (
            <div className="flex items-center space-x-2">
              <span className="text-xl">⏰</span>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Frequency</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{medicine.frequency}</p>
              </div>
            </div>
          )}

          {medicine.duration && (
            <div className="flex items-center space-x-2">
              <span className="text-xl">📅</span>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Duration</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{medicine.duration}</p>
              </div>
            </div>
          )}
        </div>

        {/* Usage Instructions */}
        {medicine.instructions && (
          <div className="ml-10 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <p className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase mb-1">Instructions</p>
            <p className="text-sm text-blue-900 dark:text-blue-100">{medicine.instructions}</p>
          </div>
        )}

        {/* Expandable Section for Warnings & Side Effects */}
        {(medicine.warnings || medicine.sideEffects) && (
          <div className="ml-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <span>{isExpanded ? '▼' : '▶'}</span>
              <span>View Warnings & Side Effects</span>
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-3">
                {/* Warnings */}
                {medicine.warnings && medicine.warnings.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
                    <p className="text-xs font-bold text-yellow-900 dark:text-yellow-200 uppercase mb-2">
                      ⚠️ Warnings
                    </p>
                    <ul className="space-y-1">
                      {medicine.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-yellow-900 dark:text-yellow-100">
                          <span className="mt-1">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Side Effects */}
                {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-900 dark:text-red-200 uppercase mb-2">
                      Possible Side Effects
                    </p>
                    <ul className="space-y-1">
                      {medicine.sideEffects.map((effect, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-red-900 dark:text-red-100">
                          <span className="mt-1">•</span>
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineRecommendation;
