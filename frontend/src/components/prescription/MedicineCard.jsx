import React from 'react';

const MedicineCard = ({ medicine }) => {
  // If name is "Not specified" but genericName exists, use genericName as the title
  const displayName = medicine.name === 'Not specified' && medicine.genericName
    ? medicine.genericName
    : medicine.name;

  const showGenericName = medicine.genericName && medicine.name !== 'Not specified' && medicine.genericName !== 'Not specified';

  // Helper to check if a value should be displayed
  const shouldShow = (value) => value && value !== 'Not specified';

  // Format the form and strength together if both exist
  const formStrength = [
    shouldShow(medicine.form) ? medicine.form : null,
    shouldShow(medicine.strength) ? `(${medicine.strength})` : null
  ].filter(Boolean).join(' ');

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-600">
      <div className="space-y-3">
        {/* Medicine Name */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{displayName}</h3>
          {showGenericName && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Generic: {medicine.genericName}
            </p>
          )}
          {formStrength && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
              {formStrength}
            </p>
          )}
        </div>

        {/* Dosage - Now shows practical dosage like "1 tablet" */}
        {shouldShow(medicine.dosage) && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💊</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Take</p>
              <p className="text-base font-semibold text-primary-600 dark:text-primary-400">
                {medicine.dosage}
              </p>
            </div>
          </div>
        )}

        {/* Frequency */}
        {shouldShow(medicine.frequency) && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Frequency</p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {medicine.frequency}
              </p>
            </div>
          </div>
        )}

        {/* Timing - When to take the medicine */}
        {shouldShow(medicine.timing) && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍽️</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">When</p>
              <p className="text-base font-medium text-gray-900 dark:text-white capitalize">
                {medicine.timing}
              </p>
            </div>
          </div>
        )}

        {/* Duration */}
        {shouldShow(medicine.duration) && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium">Duration</p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {medicine.duration}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
