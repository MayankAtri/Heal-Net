import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              HealNet uses AI technology to help you understand medical documents and get guidance on common health concerns.
              Our platform is designed to empower you with knowledge while emphasizing the importance of professional medical care.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} HealNet. For informational purposes only.
            All medical decisions should be made in consultation with healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
