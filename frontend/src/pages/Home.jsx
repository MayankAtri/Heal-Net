import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';

const Home = () => {
  const features = [
    {
      title: 'Prescription Analysis',
      description: 'Upload prescription images and get AI-powered analysis of medicines, dosages, and warnings.',
      icon: '💊',
      path: '/prescription',
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      borderGlow: 'group-hover:shadow-blue-500/50'
    },
    {
      title: 'Medical Reports',
      description: 'Analyze blood tests, X-rays, MRI scans, and pathology reports with customizable analysis depth.',
      icon: '📊',
      path: '/reports',
      gradient: 'from-emerald-500 via-green-600 to-teal-600',
      borderGlow: 'group-hover:shadow-green-500/50'
    },
    {
      title: 'OTC Consultation',
      description: 'Get over-the-counter medicine suggestions for common symptoms with safety information.',
      icon: '🏥',
      path: '/otc',
      gradient: 'from-purple-500 via-violet-600 to-purple-700',
      borderGlow: 'group-hover:shadow-purple-500/50'
    }
  ];

  const stats = [
    { number: '10k+', label: 'Analyses Completed', icon: '📈' },
    { number: '99.9%', label: 'Accuracy Rate', icon: '🎯' },
    { number: '24/7', label: 'Availability', icon: '⏰' },
    { number: '<1min', label: 'Avg Response Time', icon: '⚡' }
  ];

  const benefits = [
    { icon: '🔒', title: 'Secure & Private', description: 'Your medical data is encrypted and never shared' },
    { icon: '🤖', title: 'AI-Powered', description: 'Advanced machine learning trained on medical literature' },
    { icon: '📱', title: 'Easy to Use', description: 'Simple upload and instant results on any device' },
    { icon: '💰', title: 'Free to Use', description: 'Access all features without any hidden costs' }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="relative py-20 px-6">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 border border-blue-500/30 dark:border-purple-500/30 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-300 backdrop-blur-sm">
              🚀 AI-Powered Medical Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="text-gray-900 dark:text-white">Your Personal</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Medical AI Assistant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Instantly understand prescriptions, analyze medical reports, and get expert guidance on common health concerns—all powered by cutting-edge AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Link to="/prescription">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                Try Prescription Analysis →
              </button>
            </Link>
            <a href="#features">
              <button className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-bold rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </a>
          </motion.div>

          {/* Disclaimer Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-4 shadow-lg backdrop-blur-sm"
          >
            <p className="text-sm text-yellow-900 dark:text-yellow-200 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <strong>Medical Disclaimer:</strong> For informational purposes only. Always consult healthcare professionals for medical decisions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Section - Creative Asymmetric Layout */}
      <div id="features" className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our AI-powered tools designed to help you understand your health better
          </p>
        </motion.div>

        {/* Large Feature Card (First) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Link to={features[0].path} className="block group">
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${features[0].gradient} p-[3px] shadow-2xl ${features[0].borderGlow} transition-all duration-500 hover:scale-[1.02]`}>
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 h-full">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-8xl md:text-9xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {features[0].icon}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      {features[0].title}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {features[0].description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg group-hover:gap-4 transition-all duration-300">
                      Get Started
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Two Smaller Cards Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.slice(1).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link to={feature.path} className="block group h-full">
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${feature.gradient} p-[3px] shadow-2xl ${feature.borderGlow} transition-all duration-500 hover:scale-[1.03] h-full`}>
                  <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 h-full flex flex-col">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 flex-1 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center gap-2 font-bold group-hover:gap-4 transition-all duration-300">
                      <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        Explore Now
                      </span>
                      <svg className={`w-5 h-5 text-${index === 0 ? 'green' : 'purple'}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="px-6"
      >
        <h2 className="text-4xl font-extrabold text-center mb-12">
          <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Why Choose HealNet?
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works - Enhanced with Connecting Lines */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl shadow-2xl p-12 mx-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-5xl font-extrabold text-center mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            How It Works
          </span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Get accurate medical insights in three simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transform translate-y-1/2 -z-0 rounded-full"></div>

          {[
            {
              step: '1',
              title: 'Upload or Describe',
              description: 'Upload medical documents or describe your symptoms in plain language',
              gradient: 'from-green-500 to-emerald-600',
              icon: '📤'
            },
            {
              step: '2',
              title: 'AI Analysis',
              description: 'Our advanced AI processes your input using medical knowledge databases',
              gradient: 'from-blue-500 to-cyan-600',
              icon: '🤖'
            },
            {
              step: '3',
              title: 'Get Insights',
              description: 'Receive clear, actionable insights and recommendations instantly',
              gradient: 'from-purple-500 to-pink-600',
              icon: '✨'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative text-center group"
            >
              <div className={`bg-gradient-to-br ${item.gradient} text-white rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-extrabold shadow-2xl group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-500 relative z-10`}>
                {item.step}
              </div>
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 mx-6 text-center text-white"
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who trust HealNet for their medical information needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/prescription">
              <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300">
                Try Prescription Analysis
              </button>
            </Link>
            <Link to="/reports">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                Analyze Medical Reports
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
