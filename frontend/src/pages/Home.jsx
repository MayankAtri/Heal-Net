import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import AppleButton from '../components/ui/AppleButton';
import AnimatedBackground from '../components/common/AnimatedBackground';
import HeroVisual from '../components/ui/HeroVisual';

const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    {
      title: 'Prescription Analysis',
      description: 'AI-powered analysis of medicines, dosages, and warnings from your prescription images.',
      icon: '💊',
      path: '/prescription',
      gradient: 'from-blue-500 to-indigo-600',
      delay: 0
    },
    {
      title: 'Medical Reports',
      description: 'Deep dive into blood tests, X-rays, and MRI scans with easy-to-understand explanations.',
      icon: '📊',
      path: '/reports',
      gradient: 'from-emerald-500 to-teal-600',
      delay: 0.1
    },
    {
      title: 'OTC Consultation',
      description: 'Instant suggestions for over-the-counter medicines based on your symptoms.',
      icon: '🏥',
      path: '/otc',
      gradient: 'from-purple-500 to-violet-600',
      delay: 0.2
    },
    {
      title: 'Medicine Disposal',
      description: 'Locate safe disposal points nearby and learn environmental safety guidelines.',
      icon: '♻️',
      path: '/disposal',
      gradient: 'from-teal-500 to-green-600',
      delay: 0.3
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground variant="default" />

      {/* Main Content */}
      <div className="relative z-10">

        {/* Hero Section - Split Layout */}
        <section className="min-h-[90vh] flex items-center px-6 lg:px-12 pt-24 pb-12">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text Content */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-left space-y-8"
            >
              <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full border border-primary-500/20 text-sm font-semibold text-primary-700 dark:text-primary-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                AI-Powered Healthcare Assistant
              </motion.div>

              <motion.h1 variants={item} className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                Medical intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600">
                  simplified for you.
                </span>
              </motion.h1>

              <motion.p variants={item} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                Decode prescriptions, analyze complex medical reports, and get instant health guidance—all with the power of advanced AI.
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap gap-4">
                <Link to="/prescription">
                  <AppleButton variant="primary" size="lg" className="shadow-lg shadow-primary-500/25">
                    Start Analysis
                  </AppleButton>
                </Link>
                <a href="#features">
                  <AppleButton variant="glass" size="lg">
                    Explore Features
                  </AppleButton>
                </a>
              </motion.div>

              <div className="pt-8 space-y-4">
                <AnimatePresence>
                  {[
                    {
                      id: 'edu',
                      icon: '🎓',
                      title: 'Educational Project',
                      text: 'This is a college project for demonstration purposes only. Do not use this for actual medical decisions or advice.',
                      color: 'text-blue-600 dark:text-blue-400',
                      bg: 'bg-blue-50/80 dark:bg-blue-900/20',
                      border: 'border-blue-200 dark:border-blue-800'
                    },
                    {
                      id: 'med',
                      icon: '⚠️',
                      title: 'Medical Disclaimer',
                      text: 'For informational purposes only. Always consult healthcare professionals for medical decisions.',
                      color: 'text-amber-600 dark:text-amber-400',
                      bg: 'bg-amber-50/80 dark:bg-amber-900/20',
                      border: 'border-amber-200 dark:border-amber-800'
                    }
                  ].map((alert) => (
                    <DisclaimerCard key={alert.id} alert={alert} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex justify-end relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-500/20 to-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
              <HeroVisual />
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Comprehensive Health Tools
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Everything you need to manage your medical data in one secure, intelligent dashboard.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                >
                  <Link to={feature.path} className="block group h-full">
                    <GlassCard className="h-full hover:-translate-y-2 transition-transform duration-300 border-t-4 border-transparent hover:border-primary-500">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Enhanced */}
        <section className="py-24 px-6 bg-slate-50/50 dark:bg-black/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-16">
              From confusion to clarity <br /> in three simple steps.
            </h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                { step: '01', title: 'Upload', desc: 'Securely upload your prescription or medical report image.' },
                { step: '02', title: 'Analyze', desc: 'Our AI extracts text and identifies key medical information.' },
                { step: '03', title: 'Understand', desc: 'Get a simplified, actionable summary of your health data.' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-primary-500 flex items-center justify-center font-bold text-xl text-primary-600 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}

              {/* Connecting Line */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-200 dark:via-primary-800 to-transparent z-0" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// Separate component to handle swipe state individually
const DisclaimerCard = ({ alert }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(e, { offset, velocity }) => {
        if (Math.abs(offset.x) > 100) {
          setIsVisible(false);
        }
      }}
      className={`relative p-4 rounded-xl border ${alert.bg} ${alert.border} backdrop-blur-sm cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Slide Progress Indicator - Hint at swipeability */}
      <div className="absolute inset-0 bg-white/20 dark:bg-white/5 opacity-0 active:opacity-100 transition-opacity" />

      <div className="flex gap-3 relative z-10">
        <span className="text-xl shrink-0">{alert.icon}</span>
        <div>
          <h4 className={`font-bold text-sm ${alert.color}`}>{alert.title}</h4>
          <p className={`text-xs ${alert.color} opacity-90 leading-relaxed`}>{alert.text}</p>
        </div>
        <div className="ml-auto text-xs opacity-50 flex flex-col items-center justify-center gap-1 min-w-[40px]">
          <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
