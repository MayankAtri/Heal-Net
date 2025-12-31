import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PrescriptionPage from './pages/PrescriptionPage';
import MedicalReportsPage from './pages/MedicalReportsPage';
import OTCConsultationPage from './pages/OTCConsultationPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prescription" element={<PrescriptionPage />} />
            <Route path="/reports" element={<MedicalReportsPage />} />
            <Route path="/otc" element={<OTCConsultationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
