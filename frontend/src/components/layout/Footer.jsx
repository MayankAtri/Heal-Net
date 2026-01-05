import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Educational Project Notice */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">Educational Project Notice</h3>
              <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                <strong>This is a college project created for academic and demonstration purposes only.</strong> It is not a real medical service.
                Do not use this website for actual medical advice, diagnosis, or treatment. This platform is designed solely to showcase
                AI technology capabilities in a healthcare context as part of an educational assignment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Medical Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Medical Disclaimer</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              This platform provides informational content only and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with
              any questions you may have regarding a medical condition.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">About HealNet</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              HealNet is a student project demonstrating AI technology for understanding medical documents.
              This platform is created for educational purposes to showcase the potential of AI in healthcare contexts.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} HealNet - College Project. For educational and demonstration purposes only.
            Not intended for real medical use. All medical decisions should be made in consultation with healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
