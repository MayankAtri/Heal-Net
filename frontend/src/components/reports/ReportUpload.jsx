import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
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
        <label className="block text-sm font-bold text-gray-900 mb-3">
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
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-primary-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{depth.icon}</span>
                <h3 className="font-bold text-gray-900">{depth.label}</h3>
              </div>
              <p className="text-sm text-gray-600">{depth.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Area */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">
          Upload Medical Report
        </label>

        {!selectedFile ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400 bg-gray-50'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="space-y-3">
              <div className="text-6xl">📄</div>
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  {isDragActive ? 'Drop your report here' : 'Drag & drop your medical report'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to browse files
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Supports: JPG, PNG, PDF (max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex items-start space-x-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Report preview"
                  className="w-24 h-24 object-cover rounded border border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded border border-gray-200">
                  <span className="text-4xl">📄</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-xs text-primary-600 font-medium mt-2">
                  Analysis: {ANALYSIS_DEPTHS.find(d => d.value === analysisDepth)?.label}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                disabled={loading}
                className="text-red-500 hover:text-red-700 font-medium text-sm disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 text-center">
            <span className="font-semibold">Analyzing your medical report...</span>
            <br />
            This may take 20-40 seconds depending on the analysis depth.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportUpload;
