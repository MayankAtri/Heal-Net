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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const features = [
    {
      title: 'Prescription Analysis',
      description: 'Upload prescription images and let AI decode medicines, dosages, interactions, and potential warnings.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      path: '/prescription',
      accent: 'emerald',
    },
    {
      title: 'Medical Reports',
      description: 'Understand blood tests, X-rays, and MRI scans with clear, AI-generated explanations of findings.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      path: '/reports',
      accent: 'blue',
    },
    {
      title: 'OTC Consultation',
      description: 'Describe your symptoms and get intelligent over-the-counter medicine recommendations instantly.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
      path: '/otc',
      accent: 'violet',
    },
    {
      title: 'Medicine Disposal',
      description: 'Find safe disposal locations nearby and learn environmental guidelines for unused medicines.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438a2.253 2.253 0 01-1.699 2.652l-.829.207a8.963 8.963 0 01-3.085.12" />
        </svg>
      ),
      path: '/disposal',
      accent: 'amber',
    }
  ];

  const accentColors = {
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-800/50',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'group-hover:border-blue-200 dark:group-hover:border-blue-800/50',
    },
    violet: {
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      text: 'text-violet-600 dark:text-violet-400',
      border: 'group-hover:border-violet-200 dark:group-hover:border-violet-800/50',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'group-hover:border-amber-200 dark:group-hover:border-amber-800/50',
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground variant="default" />

      <div className="relative z-10">

        {/* Hero Section */}
        <section className="min-h-[92vh] flex items-center px-6 lg:px-12 pt-28 pb-16">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left: Text Content */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-left space-y-7"
            >
              {/* Tag */}
              <motion.div variants={item}>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  AI-Powered Healthcare
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.08] tracking-tight text-stone-900 dark:text-white">
                Understand your{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300">
                    medical records
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-emerald-300 dark:from-emerald-400 dark:to-emerald-600 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </span>
                {' '}with clarity.
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={item} className="text-base md:text-lg text-stone-500 dark:text-stone-400 max-w-md leading-relaxed">
                Decode prescriptions, analyze complex reports, and get health guidance — powered by advanced AI that speaks your language.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
                <Link to="/prescription">
                  <AppleButton variant="primary" size="lg">
                    Start Analysis
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </AppleButton>
                </Link>
                <a href="#features">
                  <AppleButton variant="glass" size="lg">
                    Explore Features
                  </AppleButton>
                </a>
              </motion.div>

              {/* Disclaimers */}
              <motion.div variants={item} className="pt-6 space-y-3">
                <AnimatePresence>
                  {[
                    {
                      id: 'edu',
                      title: 'Educational Project',
                      text: 'College project for demonstration only. Not for actual medical decisions.',
                      color: 'text-emerald-700 dark:text-emerald-400',
                      bg: 'bg-emerald-50/60 dark:bg-emerald-900/10',
                      border: 'border-emerald-200/50 dark:border-emerald-800/30',
                      icon: (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                        </svg>
                      ),
                    },
                    {
                      id: 'med',
                      title: 'Medical Disclaimer',
                      text: 'Informational only. Always consult healthcare professionals.',
                      color: 'text-amber-700 dark:text-amber-400',
                      bg: 'bg-amber-50/60 dark:bg-amber-900/10',
                      border: 'border-amber-200/50 dark:border-amber-800/30',
                      icon: (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      ),
                    }
                  ].map((alert) => (
                    <DisclaimerCard key={alert.id} alert={alert} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:flex justify-center relative"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-28 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-4 block">What we offer</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white mb-4">
                Four tools, one mission.
              </h2>
              <p className="text-base text-stone-500 dark:text-stone-400 max-w-lg mx-auto">
                Everything you need to navigate your medical documents with confidence and clarity.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feature, idx) => {
                const colors = accentColors[feature.accent];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                  >
                    <Link to={feature.path} className="block group h-full">
                      <div className={`h-full p-7 rounded-2xl bg-white/90 dark:bg-dark-card/80 backdrop-blur-sm border border-emerald-200/25 dark:border-stone-800/60 shadow-sm shadow-emerald-900/[0.02] transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/[0.08] dark:hover:shadow-black/20 hover:-translate-y-1 hover:border-emerald-300/40 ${colors.border}`}>
                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-5`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-stone-400 dark:text-stone-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          Get started
                          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-28 px-6 bg-emerald-50/30 dark:bg-dark-card/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-20"
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-4 block">How it works</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white">
                From confusion to clarity<br />
                <span className="text-stone-400 dark:text-stone-500">in three steps.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
              {[
                {
                  step: '01',
                  title: 'Upload',
                  desc: 'Securely upload your prescription or medical report image.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  ),
                },
                {
                  step: '02',
                  title: 'Analyze',
                  desc: 'AI extracts text and identifies key medical information.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                  ),
                },
                {
                  step: '03',
                  title: 'Understand',
                  desc: 'Get a simplified, actionable summary of your health data.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  ),
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white dark:bg-dark-card border border-emerald-200/40 dark:border-stone-800 flex items-center justify-center text-emerald-600 dark:text-stone-500 shadow-sm shadow-emerald-900/[0.03]">
                    {step.icon}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-[240px] mx-auto">{step.desc}</p>
                </motion.div>
              ))}

              {/* Connecting Line */}
              <div className="hidden md:block absolute top-7 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-emerald-300/50 dark:via-stone-800 to-transparent z-0" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

const DisclaimerCard = ({ alert }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDragEnd={(e, { offset }) => {
        if (Math.abs(offset.x) > 80) {
          setIsVisible(false);
        }
      }}
      className={`relative px-4 py-3 rounded-xl border ${alert.bg} ${alert.border} cursor-grab active:cursor-grabbing select-none touch-none`}
    >
      <div className="flex items-start gap-2.5">
        <span className={`mt-0.5 ${alert.color} flex-shrink-0`}>{alert.icon}</span>
        <div className="min-w-0">
          <h4 className={`font-semibold text-xs ${alert.color}`}>{alert.title}</h4>
          <p className={`text-[11px] ${alert.color} opacity-70 leading-relaxed mt-0.5`}>{alert.text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
