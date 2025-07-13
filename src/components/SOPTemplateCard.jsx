import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiUser, FiArrowRight } = FiIcons;

const SOPTemplateCard = ({ template, onSelect, delay = 0 }) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(template);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${template.color || 'bg-blue-100'}`}>
          <SafeIcon 
            icon={template.icon} 
            className={`text-xl ${template.iconColor || 'text-blue-600'}`} 
          />
        </div>
        <SafeIcon 
          icon={FiArrowRight} 
          className="text-gray-400 group-hover:text-blue-600 transition-colors" 
        />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
        {template.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {template.description}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <SafeIcon icon={FiClock} className="text-xs" />
          <span>{template.estimatedTime} min</span>
        </div>
        <div className="flex items-center space-x-1">
          <SafeIcon icon={FiUser} className="text-xs" />
          <span>{template.steps.length} steps</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SOPTemplateCard;