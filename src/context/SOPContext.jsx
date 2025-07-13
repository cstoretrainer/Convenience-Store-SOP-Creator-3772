import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SOPContext = createContext();

export const useSOPContext = () => {
  const context = useContext(SOPContext);
  if (!context) {
    throw new Error('useSOPContext must be used within a SOPProvider');
  }
  return context;
};

export const SOPProvider = ({ children }) => {
  const [sops, setSops] = useState([]);
  const [currentSOP, setCurrentSOP] = useState(null);

  useEffect(() => {
    const savedSOPs = localStorage.getItem('convenience-store-sops');
    if (savedSOPs) {
      setSops(JSON.parse(savedSOPs));
    }
  }, []);

  const saveSOPsToStorage = (updatedSOPs) => {
    localStorage.setItem('convenience-store-sops', JSON.stringify(updatedSOPs));
  };

  const createSOP = (template) => {
    const newSOP = {
      id: uuidv4(),
      ...template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedSOPs = [...sops, newSOP];
    setSops(updatedSOPs);
    saveSOPsToStorage(updatedSOPs);
    setCurrentSOP(newSOP);
    return newSOP;
  };

  const updateSOP = (id, updates) => {
    const updatedSOPs = sops.map(sop => 
      sop.id === id 
        ? { ...sop, ...updates, updatedAt: new Date().toISOString() }
        : sop
    );
    setSops(updatedSOPs);
    saveSOPsToStorage(updatedSOPs);
    
    if (currentSOP && currentSOP.id === id) {
      setCurrentSOP({ ...currentSOP, ...updates });
    }
  };

  const deleteSOP = (id) => {
    const updatedSOPs = sops.filter(sop => sop.id !== id);
    setSops(updatedSOPs);
    saveSOPsToStorage(updatedSOPs);
    
    if (currentSOP && currentSOP.id === id) {
      setCurrentSOP(null);
    }
  };

  const getSOP = (id) => {
    return sops.find(sop => sop.id === id);
  };

  const duplicateSOP = (id) => {
    const originalSOP = getSOP(id);
    if (originalSOP) {
      const duplicatedSOP = {
        ...originalSOP,
        id: uuidv4(),
        title: `${originalSOP.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedSOPs = [...sops, duplicatedSOP];
      setSops(updatedSOPs);
      saveSOPsToStorage(updatedSOPs);
      return duplicatedSOP;
    }
  };

  const value = {
    sops,
    currentSOP,
    setCurrentSOP,
    createSOP,
    updateSOP,
    deleteSOP,
    getSOP,
    duplicateSOP,
  };

  return (
    <SOPContext.Provider value={value}>
      {children}
    </SOPContext.Provider>
  );
};