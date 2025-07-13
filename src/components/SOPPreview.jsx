import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiDownload, FiAlertTriangle, FiImage, FiClock, FiUser } = FiIcons;

const SOPPreview = ({ sop, onClose }) => {
  const handleDownload = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintableHTML(sop);
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const generatePrintableHTML = (sop) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${sop.title} - SOP</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .step { margin-bottom: 15px; padding: 10px; border-left: 4px solid #007bff; }
            .warning { border-left-color: #ff6b35; background-color: #fff3cd; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; margin-bottom: 10px; color: #333; }
            ul { padding-left: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${sop.title}</h1>
            <p><strong>Category:</strong> ${sop.category}</p>
            <p><strong>Estimated Time:</strong> ${sop.estimatedTime} minutes</p>
            <p><strong>Description:</strong> ${sop.description}</p>
          </div>
          
          ${sop.safetyConsiderations.length > 0 ? `
            <div class="section">
              <div class="section-title">Safety Considerations</div>
              <ul>
                ${sop.safetyConsiderations.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${sop.requiredMaterials.length > 0 ? `
            <div class="section">
              <div class="section-title">Required Materials</div>
              <ul>
                ${sop.requiredMaterials.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          <div class="section">
            <div class="section-title">Procedure Steps</div>
            ${sop.steps.map((step, index) => `
              <div class="step ${step.isWarning ? 'warning' : ''}">
                <h3>Step ${index + 1}: ${step.title}</h3>
                <p>${step.description}</p>
                ${step.hasImage && step.imageUrl ? `<p><em>Image: ${step.imageUrl}</em></p>` : ''}
              </div>
            `).join('')}
          </div>
          
          ${sop.qualityCheckpoints.length > 0 ? `
            <div class="section">
              <div class="section-title">Quality Checkpoints</div>
              <ul>
                ${sop.qualityCheckpoints.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${sop.notes ? `
            <div class="section">
              <div class="section-title">Additional Notes</div>
              <p>${sop.notes}</p>
            </div>
          ` : ''}
          
          <div class="section">
            <p><small>Generated on ${new Date().toLocaleDateString()} using SOP Template Creator</small></p>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">SOP Preview</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiDownload} />
              <span>Download/Print</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{sop.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-gray-500" />
                <span className="text-sm text-gray-600">Category: {sop.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="text-gray-500" />
                <span className="text-sm text-gray-600">Time: {sop.estimatedTime} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-gray-500" />
                <span className="text-sm text-gray-600">Steps: {sop.steps.length}</span>
              </div>
            </div>
            {sop.description && (
              <p className="text-gray-700">{sop.description}</p>
            )}
          </div>

          {/* Safety Considerations */}
          {sop.safetyConsiderations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <SafeIcon icon={FiAlertTriangle} className="text-orange-500" />
                <span>Safety Considerations</span>
              </h3>
              <ul className="space-y-2">
                {sop.safetyConsiderations.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Materials */}
          {sop.requiredMaterials.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Materials</h3>
              <ul className="space-y-2">
                {sop.requiredMaterials.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Procedure Steps</h3>
            <div className="space-y-4">
              {sop.steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    step.isWarning 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white ${
                      step.isWarning ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
                      <p className="text-gray-700 mb-2">{step.description}</p>
                      {step.hasImage && step.imageUrl && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <SafeIcon icon={FiImage} />
                          <span>Image: {step.imageUrl}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Checkpoints */}
          {sop.qualityCheckpoints.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Quality Checkpoints</h3>
              <ul className="space-y-2">
                {sop.qualityCheckpoints.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes */}
          {sop.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Notes</h3>
              <p className="text-gray-700">{sop.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
            Generated on {new Date().toLocaleDateString()} using SOP Template Creator
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SOPPreview;