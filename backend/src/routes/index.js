const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const historyRoutes = require('./history.routes');
const prescriptionRoutes = require('./prescription.routes');
const medicalReportRoutes = require('./medicalReport.routes');
const otcConsultationRoutes = require('./otcConsultation.routes');

// Mount auth routes
router.use('/auth', authRoutes);

// Mount history routes
router.use('/history', historyRoutes);

// Mount prescription routes
router.use('/prescriptions', prescriptionRoutes);

// Mount medical report routes
router.use('/reports', medicalReportRoutes);

// Mount OTC consultation routes
router.use('/otc', otcConsultationRoutes);

module.exports = router;
