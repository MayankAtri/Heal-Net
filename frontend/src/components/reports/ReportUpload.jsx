import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { validateReportFile } from '../../utils/fileValidation';
import { ANALYSIS_DEPTHS } from '../../utils/constants';

const ReportUpload = ({ onUpload, loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [analysisDepth, setAnalysisDepth] = useState('simple');

  const onDrop = (acceptedFiles) => {
    setError(null);

    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const validation = validateReportFile(file);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setSelectedFile(file);

    // Create preview for images (not PDFs)
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false,
    disabled: loading
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    await onUpload(selectedFile, analysisDepth);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Analysis Depth Selector */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
          Analysis Depth
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ANALYSIS_DEPTHS.map((depth, index) => (
            <motion.button
              key={depth.value}
              type="button"
              onClick={() => setAnalysisDepth(depth.value)}
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={!loading ? {
                scale: 1.05,
                y: -4,
                transition: { duration: 0.2 }
              } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                analysisDepth === depth.value
                  ? 'border-blue-500 dark:border-emerald-400 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 shadow-xl'
                  : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:border-blue-300 dark:hover:border-emerald-600 hover:shadow-lg'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <motion.span
                  className="text-3xl"
                  animate={analysisDepth === depth.value ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  {depth.icon}
                </motion.span>
                <h3 className={`font-bold text-base ${
                  analysisDepth === depth.value
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {depth.label}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {depth.description}
              </p>

              {/* Checkmark for selected state */}
              {analysisDepth === depth.value && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="absolute top-3 right-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
          Upload Medical Report
        </label>

        {!selectedFile ? (
          <motion.div
            {...getRootProps()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={!loading ? { scale: 1.02, y: -4 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 overflow-hidden ${
              isDragActive
                ? 'border-blue-500 dark:border-emerald-400 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 shadow-2xl'
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-emerald-500 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-xl'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />

            {/* Animated gradient overlay */}
            {isDragActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-emerald-500/20"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}

            <div className="relative z-10 space-y-4">
              <motion.div
                className="text-6xl"
                animate={isDragActive ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{
                  duration: 0.6,
                  repeat: isDragActive ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                📄
              </motion.div>
              <div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {isDragActive ? 'Drop your report here' : 'Drag & drop your medical report'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  or click to browse files
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Supports: JPG, PNG, PDF (max 5MB)
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="border-2 border-blue-200 dark:border-emerald-700 rounded-2xl p-6 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 dark:from-blue-900/20 dark:to-emerald-900/20 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-start space-x-4">
              {preview ? (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={preview}
                  alt="Report preview"
                  className="w-24 h-24 object-cover rounded-xl border-2 border-blue-200 dark:border-emerald-600 bg-gray-50 dark:bg-gray-900 shadow-md"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-800 dark:to-emerald-800 rounded-xl border-2 border-blue-200 dark:border-emerald-600 shadow-md"
                >
                  <span className="text-4xl">📄</span>
                </motion.div>
              )}
              <div className="flex-1 min-w-0">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-sm font-bold text-gray-900 dark:text-white truncate"
                >
                  {selectedFile.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                >
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-md"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-white font-bold">
                    {ANALYSIS_DEPTHS.find(d => d.value === analysisDepth)?.label}
                  </span>
                </motion.div>
              </div>
              <motion.button
                type="button"
                onClick={handleRemoveFile}
                disabled={loading}
                whileHover={!loading ? { scale: 1.1 } : {}}
                whileTap={!loading ? { scale: 0.9 } : {}}
                className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 font-medium text-sm disabled:opacity-50 border border-red-200 dark:border-red-700 shadow-sm transition-colors"
              >
                Remove
              </motion.button>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Submit Button */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={!selectedFile || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
              size="lg"
            >
              {loading ? 'Analyzing Report...' : 'Analyze Report'}
            </Button>
          </motion.div>
        </motion.div>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border-2 border-blue-200 dark:border-emerald-700 rounded-2xl p-6 shadow-2xl overflow-hidden relative"
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.01, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-3 border-blue-500 border-t-emerald-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl"
              >
                🔬
              </motion.div>
            </div>
            <p className="text-sm font-bold bg-gradient-to-r from-blue-700 to-emerald-700 dark:from-blue-300 dark:to-emerald-300 bg-clip-text text-transparent text-center">
              Analyzing your medical report...
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
              This may take 20-40 seconds depending on the analysis depth
            </p>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/30 dark:via-emerald-500/20 to-transparent"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ReportUpload;
