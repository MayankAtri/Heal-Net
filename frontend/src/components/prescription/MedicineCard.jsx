import React from 'react';

const MedicineCard = ({ medicine }) => {
  // If name is "Not specified" but genericName exists, use genericName as the title
  const displayName = medicine.name === 'Not specified' && medicine.genericName
    ? medicine.genericName
    : medicine.name;

  const showGenericName = medicine.genericName && medicine.name !== 'Not specified';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Medicine Name */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">{displayName}</h3>
          {showGenericName && (
            <p className="text-sm text-gray-600 mt-1">
              Generic: {medicine.genericName}
            </p>
          )}
        </div>

        {/* Dosage */}
        {medicine.dosage && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💊</span>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Dosage</p>
              <p className="text-base font-semibold text-primary-600">
                {medicine.dosage}
              </p>
            </div>
          </div>
        )}

        {/* Frequency */}
        {medicine.frequency && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Frequency</p>
              <p className="text-base font-medium text-gray-900">
                {medicine.frequency}
              </p>
            </div>
          </div>
        )}

        {/* Duration */}
        {medicine.duration && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Duration</p>
              <p className="text-base font-medium text-gray-900">
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
