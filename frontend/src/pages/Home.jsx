import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';

const Home = () => {
  const features = [
    {
      title: 'Prescription Analysis',
      description: 'Upload prescription images and get AI-powered analysis of medicines, dosages, and warnings.',
      icon: '💊',
      path: '/prescription',
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
    },
    {
      title: 'Medical Reports',
      description: 'Analyze blood tests, X-rays, MRI scans, and pathology reports with customizable analysis depth.',
      icon: '📊',
      path: '/reports',
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
    },
    {
      title: 'OTC Consultation',
      description: 'Get over-the-counter medicine suggestions for common symptoms with safety information.',
      icon: '🏥',
      path: '/otc',
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-medical dark:text-green-400">HealNet</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your AI-powered medical assistant for understanding prescriptions, analyzing medical reports,
          and getting guidance on common health concerns.
        </p>
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 max-w-2xl mx-auto">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Important:</strong> This platform is for informational purposes only.
            Always consult healthcare professionals for medical advice and decisions.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link key={index} to={feature.path} className="transform transition-transform hover:scale-105">
            <Card className={`h-full ${feature.color} hover:shadow-lg cursor-pointer`}>
              <div className="text-center">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center text-medical dark:text-green-400 font-medium">
                    Get Started
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-medical dark:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Upload or Describe</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Upload medical documents or describe your symptoms
            </p>
          </div>
          <div className="text-center">
            <div className="bg-medical dark:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">AI Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Our AI processes your input using advanced medical knowledge
            </p>
          </div>
          <div className="text-center">
            <div className="bg-medical dark:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Get Insights</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Receive clear explanations and actionable recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
