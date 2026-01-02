const Prescription = require('../models/Prescription.model');
const MedicalReport = require('../models/MedicalReport.model');
const OTCConsultation = require('../models/OTCConsultation.model');

/**
 * Get aggregated history for a user across all analysis types
 * @param {String} userId - User ID
 * @param {Object} options - Pagination and filter options
 * @returns {Object} { items, pagination }
 */
const getUserHistory = async (userId, options = {}) => {
  const {
    page = 1,
    limit = 20,
    type = null, // 'prescription', 'report', 'otc' or null for all
    search = null,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  let totalItems = 0;
  let items = [];

  try {
    // Fetch data based on type filter
    if (!type || type === 'prescription') {
      const query = { userId };
      if (search) {
        query.$or = [
          { 'simplifiedAnalysis.medicines.name': { $regex: search, $options: 'i' } },
          { originalText: { $regex: search, $options: 'i' } }
        ];
      }

      const prescriptions = await Prescription.find(query)
        .sort(sort)
        .skip(!type ? 0 : skip)
        .limit(!type ? limit : limit);

      const prescriptionItems = prescriptions.map(p => ({
        id: p._id,
        type: 'prescription',
        title: p.simplifiedAnalysis?.medicines?.length > 0
          ? `Prescription - ${p.simplifiedAnalysis.medicines[0].name}${p.simplifiedAnalysis.medicines.length > 1 ? ` +${p.simplifiedAnalysis.medicines.length - 1} more` : ''}`
          : 'Prescription Analysis',
        imageUrl: p.imageUrl,
        status: p.processingStatus,
        createdAt: p.createdAt,
        data: p
      }));

      items = items.concat(prescriptionItems);

      if (type === 'prescription') {
        totalItems = await Prescription.countDocuments(query);
      }
    }

    if (!type || type === 'report') {
      const query = { userId };
      if (search) {
        query.$or = [
          { reportType: { $regex: search, $options: 'i' } },
          { reportSubtype: { $regex: search, $options: 'i' } },
          { 'analysis.summary': { $regex: search, $options: 'i' } }
        ];
      }

      const reports = await MedicalReport.find(query)
        .sort(sort)
        .skip(!type ? 0 : skip)
        .limit(!type ? limit : limit);

      const reportItems = reports.map(r => ({
        id: r._id,
        type: 'report',
        title: r.reportSubtype
          ? `${r.reportType.replace('_', ' ').toUpperCase()} - ${r.reportSubtype}`
          : r.reportType.replace('_', ' ').toUpperCase(),
        imageUrl: r.imageUrl,
        status: r.processingStatus,
        createdAt: r.createdAt,
        data: r
      }));

      items = items.concat(reportItems);

      if (type === 'report') {
        totalItems = await MedicalReport.countDocuments(query);
      }
    }

    if (!type || type === 'otc') {
      const query = { userId };
      if (search) {
        query.$or = [
          { symptomType: { $regex: search, $options: 'i' } },
          { customSymptoms: { $regex: search, $options: 'i' } },
          { 'suggestions.summary': { $regex: search, $options: 'i' } }
        ];
      }

      const consultations = await OTCConsultation.find(query)
        .sort(sort)
        .skip(!type ? 0 : skip)
        .limit(!type ? limit : limit);

      const otcItems = consultations.map(c => ({
        id: c._id,
        type: 'otc',
        title: c.symptomType === 'custom'
          ? `OTC - ${c.customSymptoms?.substring(0, 50) || 'Custom Symptoms'}`
          : `OTC - ${c.symptomType.replace('_', ' ').toUpperCase()}`,
        status: c.processingStatus,
        createdAt: c.createdAt,
        data: c
      }));

      items = items.concat(otcItems);

      if (type === 'otc') {
        totalItems = await OTCConsultation.countDocuments(query);
      }
    }

    // If no type filter, we need to count all and sort merged items
    if (!type) {
      const [prescriptionCount, reportCount, otcCount] = await Promise.all([
        Prescription.countDocuments({ userId }),
        MedicalReport.countDocuments({ userId }),
        OTCConsultation.countDocuments({ userId })
      ]);

      totalItems = prescriptionCount + reportCount + otcCount;

      // Sort merged items
      items.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        if (sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1;
        } else {
          return aVal > bVal ? 1 : -1;
        }
      });

      // Apply pagination to merged items
      items = items.slice(skip, skip + limit);
    }

    return {
      items,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(totalItems / limit),
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Get user history error:', error);
    throw error;
  }
};

/**
 * Delete a history item
 * @param {String} userId - User ID
 * @param {String} itemId - Item ID
 * @param {String} itemType - Item type ('prescription', 'report', 'otc')
 * @returns {Boolean} Success status
 */
const deleteHistoryItem = async (userId, itemId, itemType) => {
  let Model;

  switch (itemType) {
    case 'prescription':
      Model = Prescription;
      break;
    case 'report':
      Model = MedicalReport;
      break;
    case 'otc':
      Model = OTCConsultation;
      break;
    default:
      throw new Error('Invalid item type');
  }

  // Find and verify ownership before deleting
  const item = await Model.findOne({ _id: itemId, userId });

  if (!item) {
    throw new Error('Item not found or you do not have permission to delete it');
  }

  await Model.deleteOne({ _id: itemId });

  return true;
};

/**
 * Get history statistics for a user
 * @param {String} userId - User ID
 * @returns {Object} Statistics
 */
const getHistoryStats = async (userId) => {
  try {
    const [prescriptionCount, reportCount, otcCount] = await Promise.all([
      Prescription.countDocuments({ userId }),
      MedicalReport.countDocuments({ userId }),
      OTCConsultation.countDocuments({ userId })
    ]);

    return {
      totalAnalyses: prescriptionCount + reportCount + otcCount,
      prescriptions: prescriptionCount,
      reports: reportCount,
      otcConsultations: otcCount
    };
  } catch (error) {
    console.error('Get history stats error:', error);
    throw error;
  }
};

module.exports = {
  getUserHistory,
  deleteHistoryItem,
  getHistoryStats
};
