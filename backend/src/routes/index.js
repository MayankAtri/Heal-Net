const express = require('express');
const router = express.Router();
const prescriptionRoutes = require('./prescription.routes');
const medicalReportRoutes = require('./medicalReport.routes');
const otcConsultationRoutes = require('./otcConsultation.routes');

// Mount prescription routes
router.use('/prescriptions', prescriptionRoutes);

// Mount medical report routes
router.use('/reports', medicalReportRoutes);

// Mount OTC consultation routes
router.use('/otc', otcConsultationRoutes);

module.exports = router;
