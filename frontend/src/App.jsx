import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Layout from './components/layout/Layout';
import PageTransition from './components/common/PageTransition';
import Home from './pages/Home';
import PrescriptionPage from './pages/PrescriptionPage';
import MedicalReportsPage from './pages/MedicalReportsPage';
import OTCConsultationPage from './pages/OTCConsultationPage';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Force immediate scroll to top
    window.scrollTo(0, 0);

    // Also reset scroll restoration behavior
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [location.pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/prescription" element={<PageTransition><PrescriptionPage /></PageTransition>} />
          <Route path="/reports" element={<PageTransition><MedicalReportsPage /></PageTransition>} />
          <Route path="/otc" element={<PageTransition><OTCConsultationPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  useEffect(() => {
    // Disable browser's automatic scroll restoration on page load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
