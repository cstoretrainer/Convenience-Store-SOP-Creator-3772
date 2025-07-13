import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useSOPContext } from '../context/SOPContext';
import SOPPreview from './SOPPreview';

const { FiArrowLeft, FiEdit, FiDownload, FiCopy, FiTrash2, FiEye, FiClock, FiUser, FiAlertTriangle, FiImage } = FiIcons;

const SOPViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSOP, deleteSOP, duplicateSOP } = useSOPContext();
  const [sop, setSOP] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id) {
      const foundSOP = getSOP(id);
      if (foundSOP) {
        setSOP(foundSOP);
      } else {
        navigate('/');
      }
    }
  }, [id, getSOP, navigate]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this SOP?')) {
      deleteSOP(id);
      navigate('/');
    }
  };

  const handleDuplicate = () => {
    const duplicated = duplicateSOP(id);
    if (duplicated) {
      navigate(`/builder/${duplicated.id}`);
    }
  };

  if (!sop) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SOP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{sop.title}</h1>
            <p className="text-gray-600">{sop.category}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiEye} />
              <span>Preview</span>
            </button>
            <button
              onClick={handleDuplicate}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiCopy} />
              <span>Duplicate</span>
            </button>
            <Link
              to={`/builder/${id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiEdit} />
              <span>Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiTrash2} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* SOP Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
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
        </motion.div>

        {/* Safety Considerations */}
        {sop.safetyConsiderations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-orange-50 rounded-xl p-6 border border-orange-200"
          >
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
          </motion.div>
        )}

        {/* Required Materials */}
        {sop.requiredMaterials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 rounded-xl p-6 border border-blue-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Materials</h3>
            <ul className="space-y-2">
              {sop.requiredMaterials.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
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
        </motion.div>

        {/* Quality Checkpoints */}
        {sop.qualityCheckpoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-green-50 rounded-xl p-6 border border-green-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quality Checkpoints</h3>
            <ul className="space-y-2">
              {sop.qualityCheckpoints.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Notes */}
        {sop.notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Notes</h3>
            <p className="text-gray-700">{sop.notes}</p>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <SOPPreview
          sop={sop}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default SOPViewer;