import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import savedContent from '../data/editableContent.json';

export type ElementType = 'section' | 'text' | 'media' | 'card';

export interface SelectedElement {
  id: string;
  type: ElementType;
  defaultText?: string;
  defaultSrc?: string;
  defaultBgColor?: string;
  defaultTextColor?: string;
}

export interface TextData {
  content?: string;
  style?: React.CSSProperties;
}

export interface MediaData {
  src?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  objectFit?: string;
}

export interface SectionData {
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  deleted?: boolean;
}

export interface CardData {
  bgColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  deleted?: boolean;
}

export interface EditableState {
  texts: Record<string, TextData>;
  media: Record<string, MediaData>;
  sections: Record<string, SectionData>;
  lists: Record<string, any[]>;
  cards: Record<string, CardData>;
}

const defaultState: EditableState = {
  texts: (savedContent as any).texts || {},
  media: (savedContent as any).media || {},
  sections: (savedContent as any).sections || {},
  lists: (savedContent as any).lists || {},
  cards: (savedContent as any).cards || {},
};

interface EditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  state: EditableState;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedElement: SelectedElement | null;
  selectElement: (element: SelectedElement | null) => void;
  updateText: (id: string, patch: { content?: string; style?: React.CSSProperties }) => void;
  updateMedia: (id: string, patch: Partial<MediaData>) => void;
  updateSection: (id: string, patch: Partial<SectionData>) => void;
  updateCard: (id: string, patch: Partial<CardData>) => void;
  updateList: (id: string, items: any[]) => void;
  addTextBlock: (sectionId: string) => void;
  deleteText: (id: string) => void;
  saveChanges: () => Promise<boolean>;
  resetChanges: () => void;
}

const noop = () => {};

const EditContext = createContext<EditContextType>({
  isEditMode: false,
  toggleEditMode: noop,
  state: defaultState,
  undo: noop,
  redo: noop,
  canUndo: false,
  canRedo: false,
  selectedElement: null,
  selectElement: noop,
  updateText: noop,
  updateMedia: noop,
  updateSection: noop,
  updateCard: noop,
  updateList: noop,
  addTextBlock: noop,
  deleteText: noop,
  saveChanges: async () => false,
  resetChanges: noop,
});

export const useEdit = () => useContext(EditContext);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [state, setState] = useState<EditableState>(defaultState);
  const [history, setHistory] = useState<EditableState[]>([]);
  const [redoHistory, setRedoHistory] = useState<EditableState[]>([]);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);

  // Load any saved overrides from the dev/preview server on mount.
  useEffect(() => {
    const loadChanges = async () => {
      try {
        const response = await fetch('/api/get-changes');
        if (response.ok) {
          const data = await response.json();
          setState(prev => ({
            texts: { ...prev.texts, ...(data.texts || {}) },
            media: { ...prev.media, ...(data.media || {}) },
            sections: { ...prev.sections, ...(data.sections || {}) },
            lists: { ...prev.lists, ...(data.lists || {}) },
            cards: { ...prev.cards, ...(data.cards || {}) },
          }));
        }
      } catch (e) {
        console.warn('Could not load saved changes', e);
      }
    };
    loadChanges();
  }, []);

  const selectElement = useCallback((element: SelectedElement | null) => {
    setSelectedElement(element);
  }, []);

  const toggleEditMode = useCallback(() => {
    // Visual editing toggle is disabled
  }, []);

  // Push current state to history before applying the next one.
  const commit = useCallback((nextState: EditableState) => {
    setHistory(prev => [...prev, state]);
    setRedoHistory([]);
    setState(nextState);
  }, [state]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(cur => cur.slice(0, -1));
    setRedoHistory(cur => [...cur, state]);
    setState(prev);
  }, [history, state]);

  const redo = useCallback(() => {
    if (redoHistory.length === 0) return;
    const next = redoHistory[redoHistory.length - 1];
    setRedoHistory(cur => cur.slice(0, -1));
    setHistory(cur => [...cur, state]);
    setState(next);
  }, [redoHistory, state]);

  const updateText = useCallback((id: string, patch: { content?: string; style?: React.CSSProperties }) => {
    const prev = state.texts[id] || {};
    const next: TextData = {
      content: patch.content !== undefined ? patch.content : prev.content,
      style: { ...(prev.style || {}), ...(patch.style || {}) },
    };
    commit({ ...state, texts: { ...state.texts, [id]: next } });
  }, [state, commit]);

  const updateMedia = useCallback((id: string, patch: Partial<MediaData>) => {
    const prev = state.media[id] || {};
    commit({ ...state, media: { ...state.media, [id]: { ...prev, ...patch } } });
  }, [state, commit]);

  const updateSection = useCallback((id: string, patch: Partial<SectionData>) => {
    const prev = state.sections[id] || {};
    commit({ ...state, sections: { ...state.sections, [id]: { ...prev, ...patch } } });
  }, [state, commit]);

  const updateCard = useCallback((id: string, patch: Partial<CardData>) => {
    const prev = state.cards[id] || {};
    commit({ ...state, cards: { ...state.cards, [id]: { ...prev, ...patch } } });
  }, [state, commit]);

  const updateList = useCallback((id: string, items: any[]) => {
    commit({ ...state, lists: { ...state.lists, [id]: items } });
  }, [state, commit]);

  const addTextBlock = useCallback((sectionId: string) => {
    const uniqueId = `text-block-${sectionId}-${Date.now()}`;
    const next: TextData = {
      content: 'New text — click to edit',
      style: { fontSize: '1.125rem', color: '#0a2640' },
    };
    commit({ ...state, texts: { ...state.texts, [uniqueId]: next } });
    setSelectedElement({ id: uniqueId, type: 'text', defaultText: next.content });
  }, [state, commit]);

  const deleteText = useCallback((id: string) => {
    const nextTexts = { ...state.texts };
    delete nextTexts[id];
    commit({ ...state, texts: nextTexts });
    setSelectedElement(null);
  }, [state, commit]);

  const saveChanges = useCallback(async () => {
    try {
      const response = await fetch('/api/save-changes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (response.ok) {
        window.location.reload();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to save changes', e);
      return false;
    }
  }, [state]);

  const resetChanges = useCallback(() => {
    if (window.confirm('Discard all unsaved changes?')) {
      setState(defaultState);
      setHistory([]);
      setRedoHistory([]);
      setSelectedElement(null);
      setIsEditMode(false);
      window.location.reload();
    }
  }, []);

  return (
    <EditContext.Provider value={{
      isEditMode,
      toggleEditMode,
      state,
      undo,
      redo,
      canUndo: history.length > 0,
      canRedo: redoHistory.length > 0,
      selectedElement,
      selectElement,
      updateText,
      updateMedia,
      updateSection,
      updateCard,
      updateList,
      addTextBlock,
      deleteText,
      saveChanges,
      resetChanges,
    }}>
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
