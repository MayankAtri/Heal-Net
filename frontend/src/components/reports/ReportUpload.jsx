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
        <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wider">
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
                  ? 'border-emerald-500 dark:border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-xl'
                  : 'border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg'
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
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-stone-900 dark:text-white'
                }`}>
                  {depth.label}
                </h3>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {depth.description}
              </p>

              {analysisDepth === depth.value && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="absolute top-3 right-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
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
        <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wider">
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
                ? 'border-emerald-500 dark:border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-2xl'
                : 'border-stone-300 dark:border-stone-700 hover:border-emerald-400 dark:hover:border-emerald-500 bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm hover:shadow-xl'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />

            {isDragActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20"
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
                className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center"
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
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-lg font-semibold text-stone-700 dark:text-stone-300">
                  {isDragActive ? 'Drop your report here' : 'Drag & drop your medical report'}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                  or click to browse files
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 dark:bg-dark-surface border border-stone-200/60 dark:border-stone-700/60">
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
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
            className="border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl p-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-start space-x-4">
              {preview ? (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={preview}
                  alt="Report preview"
                  className="w-24 h-24 object-cover rounded-xl border-2 border-emerald-200 dark:border-emerald-600 bg-stone-50 dark:bg-dark-surface shadow-md"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/30 dark:to-teal-800/30 rounded-xl border-2 border-emerald-200 dark:border-emerald-600 shadow-md"
                >
                  <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </motion.div>
              )}
              <div className="flex-1 min-w-0">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-sm font-bold text-stone-900 dark:text-white truncate"
                >
                  {selectedFile.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="text-xs text-stone-500 dark:text-stone-400 mt-1"
                >
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-emerald-500 shadow-md"
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
                className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-medium text-sm disabled:opacity-50 border border-red-200/50 dark:border-red-700/50 shadow-sm transition-colors"
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
            className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-700/50"
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
              className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl"
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
          className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl p-6 shadow-2xl overflow-hidden relative"
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
                className="w-8 h-8 border-3 border-emerald-300 border-t-emerald-600 rounded-full"
              />
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 text-center">
              Analyzing your medical report...
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 text-center mt-2">
              This may take 20-40 seconds depending on the analysis depth
            </p>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/20 dark:via-emerald-500/10 to-transparent"
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
