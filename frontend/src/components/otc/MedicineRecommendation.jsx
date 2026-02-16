import React, { useState } from 'react';

const MedicineRecommendation = ({ medicine, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/60 dark:bg-dark-surface/60 border border-stone-200/60 dark:border-stone-800/60 rounded-xl p-5 hover:shadow-md hover:border-emerald-300/50 dark:hover:border-emerald-700/50 transition-all duration-200">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2.5">
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">{medicine.name}</h3>
            </div>
            {medicine.activeIngredient && (
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5 ml-9">
                Active: {medicine.activeIngredient}
              </p>
            )}
          </div>
        </div>

        <div className="ml-9 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {medicine.dosage && (
            <div className="flex items-center space-x-2 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg p-2.5 border border-emerald-200/30 dark:border-emerald-800/20">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
              </svg>
              <div>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-medium tracking-wider">Take</p>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{medicine.practicalDosage || medicine.dosage}</p>
              </div>
            </div>
          )}

          {medicine.frequency && (
            <div className="flex items-center space-x-2 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-2.5 border border-blue-200/30 dark:border-blue-800/20">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-medium tracking-wider">Frequency</p>
                <p className="text-xs font-medium text-stone-900 dark:text-white">{medicine.frequency}</p>
              </div>
            </div>
          )}

          {medicine.duration && (
            <div className="flex items-center space-x-2 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg p-2.5 border border-amber-200/30 dark:border-amber-800/20">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" />
              </svg>
              <div>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-medium tracking-wider">Duration</p>
                <p className="text-xs font-medium text-stone-900 dark:text-white">{medicine.duration}</p>
              </div>
            </div>
          )}
        </div>

        {medicine.instructions && (
          <div className="ml-9 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/30 dark:border-blue-800/20 rounded-lg p-3">
            <p className="text-[10px] font-medium text-blue-600 dark:text-blue-300 uppercase tracking-wider mb-1">Instructions</p>
            <p className="text-sm text-blue-800 dark:text-blue-200">{medicine.instructions}</p>
          </div>
        )}

        {(medicine.warnings || medicine.sideEffects) && (
          <div className="ml-9">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <svg className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span>View Warnings & Side Effects</span>
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-2.5">
                {medicine.warnings && medicine.warnings.length > 0 && (
                  <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-800/20 rounded-lg p-3">
                    <p className="text-[10px] font-medium text-amber-600 dark:text-amber-300 uppercase tracking-wider mb-1.5">Warnings</p>
                    <ul className="space-y-1">
                      {medicine.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5 text-sm text-amber-800 dark:text-amber-200">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                  <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-200/30 dark:border-red-800/20 rounded-lg p-3">
                    <p className="text-[10px] font-medium text-red-600 dark:text-red-300 uppercase tracking-wider mb-1.5">Possible Side Effects</p>
                    <ul className="space-y-1">
                      {medicine.sideEffects.map((effect, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5 text-sm text-red-800 dark:text-red-200">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></span>
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
