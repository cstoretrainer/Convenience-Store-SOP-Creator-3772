import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiGripVertical, FiTrash2, FiImage, FiAlertTriangle } = FiIcons;

const SortableStep = ({ step, index, onUpdate, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <SafeIcon icon={FiGripVertical} className="text-lg" />
        </div>
        
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          {index + 1}
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <input
              type="text"
              value={step.title}
              onChange={(e) => onUpdate({ ...step, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Step title"
            />
          </div>
          
          <div>
            <textarea
              value={step.description}
              onChange={(e) => onUpdate({ ...step, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed description of this step"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={step.isWarning}
                onChange={(e) => onUpdate({ ...step, isWarning: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 flex items-center space-x-1">
                <SafeIcon icon={FiAlertTriangle} className="text-orange-500" />
                <span>Warning/Important</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={step.hasImage}
                onChange={(e) => onUpdate({ ...step, hasImage: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 flex items-center space-x-1">
                <SafeIcon icon={FiImage} className="text-blue-500" />
                <span>Add Image</span>
              </label>
            </div>
          </div>
          
          {step.hasImage && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">Image URL or Description:</p>
              <input
                type="text"
                value={step.imageUrl || ''}
                onChange={(e) => onUpdate({ ...step, imageUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="https://example.com/image.jpg or describe the image"
              />
            </div>
          )}
        </div>
        
        <button
          onClick={() => onDelete(step.id)}
          className="text-red-500 hover:text-red-700 mt-1"
        >
          <SafeIcon icon={FiTrash2} className="text-lg" />
        </button>
      </div>
    </div>
  );
};

const DragDropSteps = ({ steps, onStepsChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = steps.findIndex(step => step.id === active.id);
      const newIndex = steps.findIndex(step => step.id === over.id);
      
      onStepsChange(arrayMove(steps, oldIndex, newIndex));
    }
  };

  const addStep = () => {
    const newStep = {
      id: `step-${Date.now()}`,
      title: '',
      description: '',
      isWarning: false,
      hasImage: false,
      imageUrl: '',
    };
    onStepsChange([...steps, newStep]);
  };

  const updateStep = (updatedStep) => {
    const updatedSteps = steps.map(step => 
      step.id === updatedStep.id ? updatedStep : step
    );
    onStepsChange(updatedSteps);
  };

  const deleteStep = (stepId) => {
    const updatedSteps = steps.filter(step => step.id !== stepId);
    onStepsChange(updatedSteps);
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={steps.map(step => step.id)} strategy={verticalListSortingStrategy}>
          {steps.map((step, index) => (
            <SortableStep
              key={step.id}
              step={step}
              index={index}
              onUpdate={updateStep}
              onDelete={deleteStep}
            />
          ))}
        </SortableContext>
      </DndContext>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={addStep}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
      >
        <SafeIcon icon={FiPlus} />
        <span>Add Step</span>
      </motion.button>
    </div>
  );
};

export default DragDropSteps;