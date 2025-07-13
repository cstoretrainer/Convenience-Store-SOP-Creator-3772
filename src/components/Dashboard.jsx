import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useSOPContext } from '../context/SOPContext';
import NewsletterSignup from './NewsletterSignup';
import SOPTemplateCard from './SOPTemplateCard';
import { sopTemplates } from '../data/sopTemplates';

const { FiPlus, FiFileText, FiClock, FiTrendingUp, FiUsers } = FiIcons;

const Dashboard = () => {
  const { sops, createSOP } = useSOPContext();
  const [showNewsletter, setShowNewsletter] = useState(false);

  const recentSOPs = sops.slice(-3).reverse();

  const stats = [
    {
      label: 'Total SOPs',
      value: sops.length,
      icon: FiFileText,
      color: 'bg-blue-500',
    },
    {
      label: 'This Month',
      value: sops.filter(sop => {
        const sopDate = new Date(sop.createdAt);
        const now = new Date();
        return sopDate.getMonth() === now.getMonth() && sopDate.getFullYear() === now.getFullYear();
      }).length,
      icon: FiTrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Avg. Steps',
      value: sops.length > 0 ? Math.round(sops.reduce((acc, sop) => acc + sop.steps.length, 0) / sops.length) : 0,
      icon: FiClock,
      color: 'bg-purple-500',
    },
    {
      label: 'Templates',
      value: sopTemplates.length,
      icon: FiUsers,
      color: 'bg-orange-500',
    },
  ];

  const handleCreateFromTemplate = (template) => {
    createSOP(template);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to SOP Creator
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create professional Standard Operating Procedures for your convenience store. 
          Streamline operations, ensure consistency, and train your team effectively.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/builder"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <SafeIcon icon={FiPlus} className="inline mr-2" />
            Create New SOP
          </Link>
          <button
            onClick={() => setShowNewsletter(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            Join Newsletter
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <SafeIcon icon={stat.icon} className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent SOPs */}
      {recentSOPs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent SOPs</h2>
          <div className="space-y-4">
            {recentSOPs.map((sop) => (
              <Link
                key={sop.id}
                to={`/viewer/${sop.id}`}
                className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{sop.title}</h3>
                    <p className="text-sm text-gray-600">{sop.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {sop.steps.length} steps
                    </p>
                    <p className="text-sm text-gray-500">
                      {sop.estimatedTime} min
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* SOP Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Start Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sopTemplates.slice(0, 6).map((template, index) => (
            <SOPTemplateCard
              key={template.id}
              template={template}
              onSelect={handleCreateFromTemplate}
              delay={index * 0.1}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/builder"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View all templates →
          </Link>
        </div>
      </motion.div>

      {/* Newsletter Signup Modal */}
      {showNewsletter && (
        <NewsletterSignup onClose={() => setShowNewsletter(false)} />
      )}
    </div>
  );
};

export default Dashboard;