import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import Button from '../common/Button';
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
    <div className="space-y-4">
      {/* Dropzone */}
      {!selectedFile && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
            isDragActive
              ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 shadow-xl scale-105'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 hover:shadow-lg'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />

          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-110"
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

            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {isDragActive ? 'Drop prescription here' : 'Upload Prescription Image'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Drag and drop, or click to browse
              </p>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>Supported formats: JPG, PNG</p>
              <p>Maximum size: 5MB</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* File Preview */}
      {selectedFile && previewUrl && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            {!loading && (
              <button
                onClick={handleClear}
                className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>

          {/* Image Preview */}
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={previewUrl}
              alt="Prescription preview"
              className="w-full h-auto max-h-96 object-contain bg-gray-50 dark:bg-gray-900"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Analyzing Prescription...' : 'Analyze Prescription'}
          </Button>

          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 shadow-lg overflow-hidden relative"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-sm text-blue-700 dark:text-blue-200 text-center font-medium">
                  ⏱️ AI is analyzing your prescription. This may take 20-40 seconds...
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
      )}
    </div>
  );
};

export default PrescriptionUpload;
