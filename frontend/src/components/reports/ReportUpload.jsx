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
          {ANALYSIS_DEPTHS.map((depth) => (
            <button
              key={depth.value}
              type="button"
              onClick={() => setAnalysisDepth(depth.value)}
              disabled={loading}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                analysisDepth === depth.value
                  ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-500/20 shadow-md ring-2 ring-primary-200 dark:ring-primary-500/50'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-600'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{depth.icon}</span>
                <h3 className="font-bold text-gray-900 dark:text-white">{depth.label}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{depth.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
          Upload Medical Report
        </label>

        {!selectedFile ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              isDragActive
                ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 shadow-xl scale-105'
                : 'border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-lg'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="space-y-3">
              <div className="text-6xl">📄</div>
              <div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {isDragActive ? 'Drop your report here' : 'Drag & drop your medical report'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  or click to browse files
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supports: JPG, PNG, PDF (max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
            <div className="flex items-start space-x-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Report preview"
                  className="w-24 h-24 object-cover rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                  <span className="text-4xl">📄</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-2">
                  Analysis: {ANALYSIS_DEPTHS.find(d => d.value === analysisDepth)?.label}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                disabled={loading}
                className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      {/* Submit Button */}
      {selectedFile && (
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!selectedFile || loading}
          className="w-full"
          size="lg"
        >
          {loading ? 'Analyzing Report...' : 'Analyze Report'}
        </Button>
      )}

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
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center relative z-10">
              <span className="font-semibold">Analyzing your medical report...</span>
              <br />
              This may take 20-40 seconds depending on the analysis depth.
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
  );
};

export default ReportUpload;
