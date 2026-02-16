import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-50/30 dark:bg-dark-card/50 border-t border-emerald-200/30 dark:border-stone-800/50 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Educational Project Notice */}
        <div className="mb-8 p-5 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200 mb-1">Educational Project</h3>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/70 leading-relaxed">
                This is a college project created for academic and demonstration purposes only. It is not a real medical service.
                Do not use this website for actual medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">Medical Disclaimer</h3>
            <p className="text-sm text-stone-500 dark:text-stone-500 leading-relaxed">
              This platform provides informational content only and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">About HealNet</h3>
            <p className="text-sm text-stone-500 dark:text-stone-500 leading-relaxed">
              HealNet is a student project demonstrating AI technology for understanding medical documents.
              Created for educational purposes to showcase the potential of AI in healthcare contexts.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200/50 dark:border-stone-800/50">
          <p className="text-center text-xs text-stone-400 dark:text-stone-600">
            &copy; {new Date().getFullYear()} HealNet &mdash; College Project. For educational and demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
