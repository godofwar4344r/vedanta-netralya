import React, { createContext, useContext, useState, useCallback } from 'react';

interface EditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  deletedSections: Set<string>;
  deleteSection: (id: string) => void;
  restoreSection: (id: string) => void;
  restoreAll: () => void;
}

const EditContext = createContext<EditContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  deletedSections: new Set(),
  deleteSection: () => {},
  restoreSection: () => {},
  restoreAll: () => {},
});

export const useEdit = () => useContext(EditContext);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [deletedSections, setDeletedSections] = useState<Set<string>>(new Set());

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const deleteSection = useCallback((id: string) => {
    setDeletedSections(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const restoreSection = useCallback((id: string) => {
    setDeletedSections(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const restoreAll = useCallback(() => {
    setDeletedSections(new Set());
  }, []);

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, deletedSections, deleteSection, restoreSection, restoreAll }}>
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
