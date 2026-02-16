import React from 'react';

const MedicineCard = ({ medicine }) => {
  const displayName = medicine.name === 'Not specified' && medicine.genericName
    ? medicine.genericName
    : medicine.name;

  const showGenericName = medicine.genericName && medicine.name !== 'Not specified' && medicine.genericName !== 'Not specified';
  const shouldShow = (value) => value && value !== 'Not specified';

  const formStrength = [
    shouldShow(medicine.form) ? medicine.form : null,
    shouldShow(medicine.strength) ? `(${medicine.strength})` : null
  ].filter(Boolean).join(' ');

  return (
    <div className="bg-white/60 dark:bg-dark-surface/60 border border-stone-200/60 dark:border-stone-800/60 rounded-xl p-5 hover:shadow-md hover:border-emerald-300/50 dark:hover:border-emerald-700/50 transition-all duration-200">
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-white">{displayName}</h3>
          {showGenericName && (
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
              Generic: {medicine.genericName}
            </p>
          )}
          {formStrength && (
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 capitalize">
              {formStrength}
            </p>
          )}
        </div>

        {shouldShow(medicine.dosage) && (
          <div className="flex items-center space-x-2.5">
            <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            <div>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-medium tracking-wider">Take</p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{medicine.dosage}</p>
            </div>
          </div>
        )}

        {shouldShow(medicine.frequency) && (
          <div className="flex items-center space-x-2.5">
            <svg className="w-5 h-5 text-stone-400 dark:text-stone-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-medium tracking-wider">Frequency</p>
              <p className="text-sm font-medium text-stone-900 dark:text-white">{medicine.frequency}</p>
            </div>
          </div>
        )}

        {shouldShow(medicine.timing) && (
          <div className="flex items-center space-x-2.5">
            <svg className="w-5 h-5 text-stone-400 dark:text-stone-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z" />
            </svg>
            <div>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-medium tracking-wider">When</p>
              <p className="text-sm font-medium text-stone-900 dark:text-white capitalize">{medicine.timing}</p>
            </div>
          </div>
        )}

        {shouldShow(medicine.duration) && (
          <div className="flex items-center space-x-2.5">
            <svg className="w-5 h-5 text-stone-400 dark:text-stone-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <div>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-medium tracking-wider">Duration</p>
              <p className="text-sm font-medium text-stone-900 dark:text-white">{medicine.duration}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
