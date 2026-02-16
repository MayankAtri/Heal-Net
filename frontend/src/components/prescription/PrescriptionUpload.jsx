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
      const validation = validatePrescriptionFile(file);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    maxFiles: 1,
    multiple: false,
    disabled: loading
  });

  const handleSubmit = () => {
    if (selectedFile && onUpload) onUpload(selectedFile);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!selectedFile && (
        <motion.div
          {...getRootProps()}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`
            relative overflow-hidden border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive
              ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10'
              : 'border-stone-300/50 dark:border-stone-700/50 hover:border-emerald-400/50 bg-white/50 dark:bg-dark-card/50 backdrop-blur-xl hover:bg-white/70 dark:hover:bg-dark-card/70'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-5 relative z-10">
            <div className="flex justify-center">
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30">
                <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-stone-900 dark:text-white mb-1">
                {isDragActive ? 'Drop prescription here' : 'Upload Prescription Image'}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Drag and drop, or click to browse
              </p>
            </div>
            <div className="inline-flex flex-col gap-0.5 px-4 py-2 rounded-xl bg-stone-100/50 dark:bg-dark-surface/50 border border-stone-200/50 dark:border-stone-700/50">
              <p className="text-xs text-stone-500 dark:text-stone-400">Supported: JPG, PNG &middot; Max 5MB</p>
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50/80 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </motion.div>
      )}

      {selectedFile && previewUrl && (
        <GlassCard padding="lg" hover={false}>
          <div className="space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-white">{selectedFile.name}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              {!loading && (
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="rounded-xl overflow-hidden border border-stone-200/60 dark:border-stone-800/60">
              <img
                src={previewUrl}
                alt="Prescription preview"
                className="w-full h-auto max-h-96 object-contain bg-stone-50 dark:bg-dark-surface"
              />
            </div>

            <AppleButton onClick={handleSubmit} loading={loading} disabled={loading} variant="primary" size="lg" fullWidth>
              {loading ? 'Analyzing Prescription...' : 'Analyze Prescription'}
            </AppleButton>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-emerald-50/80 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl p-5 overflow-hidden relative"
              >
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                    AI is analyzing your prescription. This may take 20-40 seconds...
                  </p>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/20 dark:via-emerald-500/10 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
