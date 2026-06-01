import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, RotateCcw } from 'lucide-react';
import { useEdit } from '../context/EditContext';

interface EditableSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const EditableSection: React.FC<EditableSectionProps> = ({ id, className = '', children }) => {
  const { isEditMode, deletedSections, deleteSection, restoreSection } = useEdit();
  const isDeleted = deletedSections.has(id);

  if (isDeleted && !isEditMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        layout
        className={`relative group/edit ${className} ${isDeleted ? 'opacity-30 pointer-events-none' : ''}`}
        style={{ position: 'relative' }}
      >
        {/* Edit mode overlay */}
        {isEditMode && (
          <div className={`absolute inset-0 z-50 pointer-events-none border-2 rounded-xl transition-colors duration-200 ${
            isDeleted ? 'border-red-400/60 bg-red-500/5' : 'border-brand-teal/0 group-hover/edit:border-brand-teal/40'
          }`}>
            {/* Delete / Restore Button */}
            <div className="absolute -top-3 -right-3 pointer-events-auto flex gap-1.5 z-[60]">
              {isDeleted ? (
                <button
                  onClick={(e) => { e.stopPropagation(); restoreSection(id); }}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  title="Restore section"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); deleteSection(id); }}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all hover:scale-110 opacity-0 group-hover/edit:opacity-100"
                  title="Delete section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Section ID label */}
            <span className="absolute -top-3 left-3 bg-brand-navy text-brand-teal text-[8px] tracking-widest uppercase font-black px-2 py-0.5 rounded pointer-events-none opacity-0 group-hover/edit:opacity-100 transition-opacity">
              {id}
            </span>
          </div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default EditableSection;
