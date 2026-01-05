import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import AppleButton from '../components/ui/AppleButton';
import AnimatedBackground from '../components/common/AnimatedBackground';

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
    },
    {
      title: 'Medicine Disposal',
      description: 'Find nearby disposal locations and learn how to safely dispose of unused or expired medicines.',
      icon: '♻️',
      path: '/disposal',
      gradient: 'from-teal-500 via-emerald-600 to-green-600',
      borderGlow: 'group-hover:shadow-teal-500/50'
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
    <div className="relative min-h-screen">
      {/* Optimized Animated Background */}
      <AnimatedBackground variant="default" />

      <div className="relative z-10 space-y-12 pb-16">
        {/* Hero Section */}
        <div className="relative pt-8 pb-16 md:pt-12 md:pb-20 px-6">
          {/* Hero Content */}
          <div className="relative text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 dark:from-blue-500/30 dark:to-emerald-500/30 border border-blue-500/30 dark:border-emerald-500/30 rounded-full text-sm font-semibold text-blue-700 dark:text-emerald-300 backdrop-blur-sm">
              🚀 AI-Powered Medical Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight"
          >
            <span className="text-gray-900 dark:text-white">Your Personal</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Medical AI Assistant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Instantly understand prescriptions, analyze medical reports, and get expert guidance on common health concerns—all powered by cutting-edge AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Link to="/prescription">
              <AppleButton variant="primary" size="lg">
                Try Prescription Analysis →
              </AppleButton>
            </Link>
            <a href="#features">
              <AppleButton variant="secondary" size="lg">
                Learn More
              </AppleButton>
            </a>
          </motion.div>

          {/* Disclaimer Badges */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="inline-block bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-2 border-blue-400 dark:border-blue-600 rounded-2xl p-4 shadow-lg backdrop-blur-sm"
            >
              <p className="text-sm text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <strong>Educational Project:</strong> This is a college project for demonstration purposes only. Do not use this for actual medical decisions or advice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-block bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-4 shadow-lg backdrop-blur-sm"
            >
              <p className="text-sm text-yellow-900 dark:text-yellow-200 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <strong>Medical Disclaimer:</strong> For informational purposes only. Always consult healthcare professionals for medical decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "100px" }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6"
      >
        {stats.map((stat, index) => (
          <GlassCard key={index} padding="md" className="text-center transition-transform hover:scale-105">
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#007AFF] to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Features Section - Creative Asymmetric Layout */}
      <div id="features" className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-extrabold mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from our AI-powered tools designed to help you understand your health better
          </p>
        </motion.div>

        {/* All Feature Cards - Equal Size 2x2 Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: "100px" }}
          transition={{ duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <Link key={index} to={feature.path} className="block group h-full">
              <GlassCard padding="lg" className={`h-full hover:shadow-2xl ${feature.borderGlow} transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className={`p-6 rounded-3xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 transition-transform duration-300 group-hover:scale-110`}>
                    <div className="text-6xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className={`text-2xl font-extrabold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent font-bold text-sm transition-all duration-300 group-hover:gap-4`}>
                      Get Started
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "100px" }}
        transition={{ duration: 0.5 }}
        className="px-6"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8">
          <span className="bg-gradient-to-r from-[#007AFF] to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Why Choose HealNet?
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <GlassCard key={index} padding="md" className="transition-transform hover:scale-105 h-full">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* How It Works - Enhanced with Connecting Lines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "100px" }}
        transition={{ duration: 0.5 }}
        className="mx-6"
      >
        <GlassCard padding="lg" hover={false}>
        <h2 className="text-3xl font-extrabold text-center mb-3">
          <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
            How It Works
          </span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-base mb-8 max-w-2xl mx-auto">
          Get accurate medical insights in three simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 transform translate-y-1/2 -z-0 rounded-full"></div>

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
              gradient: 'from-teal-500 to-emerald-600',
              icon: '✨'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              <div className={`bg-gradient-to-br ${item.gradient} text-white rounded-3xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-extrabold shadow-2xl relative z-10 transition-all duration-300 group-hover:shadow-teal-500/50 group-hover:scale-110`}>
                {item.step}
              </div>
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        </GlassCard>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3, margin: "100px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 rounded-3xl shadow-2xl p-12 mx-6 text-center text-white"
      >
        {/* Static background effect */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-40"></div>

        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who trust HealNet for their medical information needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/prescription">
              <AppleButton variant="secondary" size="lg">
                Try Prescription Analysis
              </AppleButton>
            </Link>
            <Link to="/reports">
              <AppleButton variant="glass" size="lg" className="border-white/30 text-white dark:text-white hover:bg-white/20">
                Analyze Medical Reports
              </AppleButton>
            </Link>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Home;
