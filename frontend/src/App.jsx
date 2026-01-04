import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import PageTransition from './components/common/PageTransition';
import Home from './pages/Home';
import PrescriptionPage from './pages/PrescriptionPage';
import PrescriptionDetailPage from './pages/PrescriptionDetailPage';
import MedicalReportsPage from './pages/MedicalReportsPage';
import ReportDetailPage from './pages/ReportDetailPage';
import OTCConsultationPage from './pages/OTCConsultationPage';
import OTCDetailPage from './pages/OTCDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import Profile from './pages/Profile';
import History from './pages/History';
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
          <Route path="/prescription/:id" element={<PageTransition><PrescriptionDetailPage /></PageTransition>} />
          <Route path="/reports" element={<PageTransition><MedicalReportsPage /></PageTransition>} />
          <Route path="/reports/:id" element={<PageTransition><ReportDetailPage /></PageTransition>} />
          <Route path="/otc" element={<PageTransition><OTCConsultationPage /></PageTransition>} />
          <Route path="/otc/:id" element={<PageTransition><OTCDetailPage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/auth/callback" element={<PageTransition><AuthCallback /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="/history" element={<PageTransition><History /></PageTransition>} />
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
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
