import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export default function InputCaseDetails({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    caseType: 'Criminal',
    complainant: 'Seema Batra, Mukesh Kumar',
    accused: 'Ajay Kumar, Raj Rani',
    victim: 'Neha Kumari',
    allegations: 'Dowry harassment, domestic violence, and abetment to suicide (304B, 498A, DP Act)',
    factsSummary: 'Neha Kumari found hanging from ceiling fan, with evidence suggesting possible foul play amid dowry harassment allegations',
    dateOfIncident: '16.10.2022',
    representing: 'Neha Kumari'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRepresentingChange = (person) => {
    setFormData(prev => ({
      ...prev,
      representing: person
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Case Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Case Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Type
            </label>
            <div className="relative">
              <select 
                value={formData.caseType}
                onChange={(e) => handleInputChange('caseType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Family">Family</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Complainant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complainant
            </label>
            <input
              type="text"
              value={formData.complainant}
              onChange={(e) => handleInputChange('complainant', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Accused */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accused
            </label>
            <input
              type="text"
              value={formData.accused}
              onChange={(e) => handleInputChange('accused', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Victim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Victim
            </label>
            <input
              type="text"
              value={formData.victim}
              onChange={(e) => handleInputChange('victim', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Allegations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allegations
            </label>
            <textarea
              value={formData.allegations}
              onChange={(e) => handleInputChange('allegations', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Facts Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facts Summary
            </label>
            <textarea
              value={formData.factsSummary}
              onChange={(e) => handleInputChange('factsSummary', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Date of Incident */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Incident
            </label>
            <input
              type="text"
              value={formData.dateOfIncident}
              onChange={(e) => handleInputChange('dateOfIncident', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Representing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Representing (please select)*
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleRepresentingChange('Neha Kumari')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.representing === 'Neha Kumari'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Neha Kumari
              </button>
              <button
                onClick={() => handleRepresentingChange('Ajay Kumar, Raj Rani')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.representing === 'Ajay Kumar, Raj Rani'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Ajay Kumar, Raj Rani
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
}