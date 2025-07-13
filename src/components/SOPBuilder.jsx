import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useSOPContext } from '../context/SOPContext';
import { sopTemplates } from '../data/sopTemplates';
import SOPTemplateCard from './SOPTemplateCard';
import DragDropSteps from './DragDropSteps';
import SOPPreview from './SOPPreview';

const { FiSave, FiEye, FiArrowLeft, FiPlus } = FiIcons;

const SOPBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createSOP, updateSOP, getSOP } = useSOPContext();
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [sopData, setSOPData] = useState({
    title: '',
    category: '',
    description: '',
    estimatedTime: 15,
    difficulty: 'Beginner',
    steps: [],
    safetyConsiderations: [],
    requiredMaterials: [],
    qualityCheckpoints: [],
    notes: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id) {
      const existingSOP = getSOP(id);
      if (existingSOP) {
        setSOPData(existingSOP);
        setSelectedTemplate(true); // Skip template selection
      }
    }
  }, [id, getSOP]);

  const handleTemplateSelect = (template) => {
    setSOPData({
      ...sopData,
      ...template,
      id: undefined, // Remove ID for new SOP
    });
    setSelectedTemplate(template);
  };

  const handleSave = () => {
    if (id) {
      updateSOP(id, sopData);
    } else {
      const newSOP = createSOP(sopData);
      navigate(`/builder/${newSOP.id}`);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (!selectedTemplate) {
    return (
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New SOP</h1>
          <p className="text-gray-600">Choose a template to get started or create from scratch</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sopTemplates.map((template, index) => (
            <SOPTemplateCard
              key={template.id}
              template={template}
              onSelect={handleTemplateSelect}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Or Start from Scratch</h2>
          <button
            onClick={() => setSelectedTemplate(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            <SafeIcon icon={FiPlus} className="inline mr-2" />
            Create Custom SOP
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {id ? 'Edit SOP' : 'Build Your SOP'}
            </h1>
            <p className="text-gray-600">Customize your Standard Operating Procedure</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlePreview}
              className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiEye} className="inline mr-2" />
              Preview
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              <SafeIcon icon={FiSave} className="inline mr-2" />
              Save SOP
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SOP Title
                </label>
                <input
                  type="text"
                  value={sopData.title}
                  onChange={(e) => setSOPData({...sopData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter SOP title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={sopData.category}
                    onChange={(e) => setSOPData({...sopData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Daily Operations">Daily Operations</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Inventory Management">Inventory Management</option>
                    <option value="Safety & Security">Safety & Security</option>
                    <option value="Emergency Procedures">Emergency Procedures</option>
                    <option value="Equipment Operation">Equipment Operation</option>
                    <option value="Cleaning & Maintenance">Cleaning & Maintenance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={sopData.estimatedTime}
                    onChange={(e) => setSOPData({...sopData, estimatedTime: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={sopData.description}
                  onChange={(e) => setSOPData({...sopData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of this SOP"
                />
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Procedure Steps</h2>
            <DragDropSteps
              steps={sopData.steps}
              onStepsChange={(steps) => setSOPData({...sopData, steps})}
            />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Safety Considerations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Safety Considerations</h3>
            <div className="space-y-3">
              {sopData.safetyConsiderations.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...sopData.safetyConsiderations];
                      updated[index] = e.target.value;
                      setSOPData({...sopData, safetyConsiderations: updated});
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Safety consideration"
                  />
                  <button
                    onClick={() => {
                      const updated = sopData.safetyConsiderations.filter((_, i) => i !== index);
                      setSOPData({...sopData, safetyConsiderations: updated});
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => setSOPData({
                  ...sopData, 
                  safetyConsiderations: [...sopData.safetyConsiderations, '']
                })}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Safety Item
              </button>
            </div>
          </motion.div>

          {/* Required Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Materials</h3>
            <div className="space-y-3">
              {sopData.requiredMaterials.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...sopData.requiredMaterials];
                      updated[index] = e.target.value;
                      setSOPData({...sopData, requiredMaterials: updated});
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Required material"
                  />
                  <button
                    onClick={() => {
                      const updated = sopData.requiredMaterials.filter((_, i) => i !== index);
                      setSOPData({...sopData, requiredMaterials: updated});
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => setSOPData({
                  ...sopData, 
                  requiredMaterials: [...sopData.requiredMaterials, '']
                })}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Material
              </button>
            </div>
          </motion.div>

          {/* Quality Checkpoints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality Checkpoints</h3>
            <div className="space-y-3">
              {sopData.qualityCheckpoints.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...sopData.qualityCheckpoints];
                      updated[index] = e.target.value;
                      setSOPData({...sopData, qualityCheckpoints: updated});
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Quality checkpoint"
                  />
                  <button
                    onClick={() => {
                      const updated = sopData.qualityCheckpoints.filter((_, i) => i !== index);
                      setSOPData({...sopData, qualityCheckpoints: updated});
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => setSOPData({
                  ...sopData, 
                  qualityCheckpoints: [...sopData.qualityCheckpoints, '']
                })}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Checkpoint
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <SOPPreview
          sop={sopData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default SOPBuilder;