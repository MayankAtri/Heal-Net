import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import AppleButton from '../ui/AppleButton';
import GlassCard from '../ui/GlassCard';
import { validatePrescriptionFile, formatFileSize } from '../../utils/fileValidation';

const PrescriptionUpload = ({ onUpload, loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      setError('Invalid file. Please upload a JPG or PNG image.');
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      // Validate file
      const validation = validatePrescriptionFile(file);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    multiple: false,
    disabled: loading
  });

  const handleSubmit = () => {
    if (selectedFile && onUpload) {
      onUpload(selectedFile);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      {!selectedFile && (
        <motion.div
          {...getRootProps()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`
            relative overflow-hidden
            border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer
            transition-all duration-300 transform
            ${
              isDragActive
                ? 'border-[#007AFF] bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl shadow-blue-500/30 scale-[1.02]'
                : 'border-gray-300/50 dark:border-gray-600/50 hover:border-[#007AFF]/50 dark:hover:border-[#007AFF]/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl hover:bg-white/70 dark:hover:bg-gray-800/70 hover:shadow-xl hover:scale-[1.01]'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />

          <div className="space-y-6 relative z-10">
            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 rounded-full bg-gradient-to-br from-[#007AFF]/10 to-blue-500/10 border border-[#007AFF]/20">
                <svg
                  className="w-16 h-16 text-[#007AFF] dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
            </motion.div>

            <div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {isDragActive ? 'Drop prescription here' : 'Upload Prescription Image'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drag and drop, or click to browse
              </p>
            </div>

            <div className="inline-flex flex-col gap-1 px-6 py-3 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50">
              <p className="text-xs text-gray-600 dark:text-gray-400">Supported formats: JPG, PNG</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Maximum size: 5MB</p>
            </div>
          </div>

          {/* Gradient overlay for glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 pointer-events-none" />
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-red-50/70 dark:bg-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-700/50 rounded-2xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium text-red-700 dark:text-red-200">{error}</p>
          </div>
        </motion.div>
      )}

      {/* File Preview */}
      {selectedFile && previewUrl && (
        <GlassCard padding="lg" hover={false}>
          <div className="space-y-6">
            {/* File Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#007AFF]/10 to-blue-500/10 border border-[#007AFF]/20">
                  <svg className="w-6 h-6 text-[#007AFF] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              {!loading && (
                <motion.button
                  onClick={handleClear}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full bg-red-50/70 dark:bg-red-900/30 backdrop-blur-xl border border-red-200/50 dark:border-red-700/50 text-red-600 dark:text-red-400 hover:bg-red-100/70 dark:hover:bg-red-900/50 text-sm font-medium transition-all duration-300"
                >
                  Remove
                </motion.button>
              )}
            </div>

            {/* Image Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              <img
                src={previewUrl}
                alt="Prescription preview"
                className="w-full h-auto max-h-96 object-contain bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
              />
            </motion.div>

            {/* Submit Button */}
            <AppleButton
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
              variant="primary"
              size="lg"
              fullWidth
            >
              {loading ? 'Analyzing Prescription...' : 'Analyze Prescription'}
            </AppleButton>

            {/* Loading Indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50/70 dark:bg-blue-900/30 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-6 shadow-lg overflow-hidden relative"
              >
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.01, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-200 text-center font-medium">
                    AI is analyzing your prescription. This may take 20-40 seconds...
                  </p>
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-500/20 to-transparent"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default PrescriptionUpload;
