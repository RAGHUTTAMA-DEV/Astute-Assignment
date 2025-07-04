import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';

export default function CaseDetails({ isOpen, onClose }) {
  const [caseDescription, setCaseDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' && file.size <= 20 * 1024 * 1024) {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF file under 20MB');
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' && file.size <= 20 * 1024 * 1024) {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF file under 20MB');
      }
    }
  };

  const handleRunSummariser = () => {
    if (!uploadedFile && !caseDescription.trim()) {
      alert('Please upload a file or enter case description');
      return;
    }
    
    // Simulate AI processing
    console.log('Running AI Summariser...');
    console.log('File:', uploadedFile);
    console.log('Description:', caseDescription);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Case Details</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Upload Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Upload the case files</h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="w-10 h-10 text-gray-400" />
                </div>
                
                {uploadedFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-700">{uploadedFile.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Drag and drop your document</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse files
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 cursor-pointer transition-colors text-sm"
                >
                  Browse Files
                </label>
              </div>
            </div>

            <div className="flex items-center mt-3">
              <FileText className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-xs text-gray-500">PDF (max. 20 MB)</span>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Manual Entry Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add case facts manually</h3>
            <textarea
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
              placeholder="Enter case description"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={6}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleRunSummariser}
            className="w-full bg-slate-800 text-white py-3 px-4 rounded-md hover:bg-slate-700 transition-colors font-medium"
          >
            Run AI Summariser
          </button>
        </div>
      </div>
    </div>
  );
}