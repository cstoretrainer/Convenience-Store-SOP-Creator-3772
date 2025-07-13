import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SOPBuilder from './components/SOPBuilder';
import SOPViewer from './components/SOPViewer';
import SavedSOPs from './components/SavedSOPs';
import { SOPProvider } from './context/SOPContext';
import './App.css';

function App() {
  const [currentSOP, setCurrentSOP] = useState(null);

  return (
    <SOPProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/builder" element={<SOPBuilder />} />
              <Route path="/builder/:id" element={<SOPBuilder />} />
              <Route path="/viewer/:id" element={<SOPViewer />} />
              <Route path="/saved" element={<SavedSOPs />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SOPProvider>
  );
}

export default App;