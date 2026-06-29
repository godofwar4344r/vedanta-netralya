import React, { useState, useRef } from 'react';
import { useEdit, ElementType } from '../context/EditContext';
import { X, ArrowUp, ArrowDown, Copy, Trash2, Plus } from 'lucide-react';

/**
 * Injects a high-specificity style so a colour override actually wins over the
 * Tailwind `bg-*` / `text-*` class on the inner element. Without this the
 * wrapper's background sits *behind* the section's own background and is never
 * visible — which is why background colour appeared to "do nothing" before.
 */
const ColorOverride: React.FC<{ id: string; bgColor?: string; textColor?: string; borderRadius?: string }> = ({ id, bgColor, textColor, borderRadius }) => {
  const rules: string[] = [];
  if (bgColor) rules.push(`background-color:${bgColor} !important;`);
  if (textColor) rules.push(`color:${textColor} !important;`);
  if (borderRadius) rules.push(`border-radius:${borderRadius} !important;`);
  if (!rules.length) return null;
  // Targets the element's real content child so its own rounded corners are kept.
  return <style>{`#${id} > :first-child{${rules.join('')}}`}</style>;
};

// Small floating label shown on the currently selected element.
const SelectedBadge: React.FC<{ type: ElementType; onClear: () => void }> = ({ type, onClear }) => (
  <span
    contentEditable={false}
    className="absolute -top-3 left-2 z-[80] flex items-center gap-1 bg-brand-teal text-brand-navy text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg select-none pointer-events-auto"
  >
    {type}
    <button onClick={(e) => { e.stopPropagation(); onClear(); }} className="hover:text-red-600">
      <X className="w-2.5 h-2.5" />
    </button>
  </span>
);

const editOutline = (selected: boolean, hover: boolean): string | undefined =>
  selected ? '3px solid #00abc0' : hover ? '2px dashed rgba(0,171,192,0.55)' : undefined;

/**
 * Corner drag handle. Shows the double-arrow (nwse-resize) cursor and reports
 * the new pixel width/height as the user drags from the bottom-right corner.
 */
const ResizeHandle: React.FC<{ targetRef: React.RefObject<HTMLElement>; onResize: (w: number, h: number) => void }> = ({ targetRef, onResize }) => {
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const startW = rect.width;
    const startH = rect.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const move = (ev: MouseEvent) => {
      const w = Math.max(24, Math.round(startW + (ev.clientX - startX)));
      const h = Math.max(24, Math.round(startH + (ev.clientY - startY)));
      onResize(w, h);
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <span
      contentEditable={false}
      onMouseDown={onMouseDown}
      title="Drag to resize"
      className="absolute -bottom-2 -right-2 z-[85] w-4 h-4 bg-brand-teal border-2 border-white rounded-sm shadow-md hover:scale-125 transition-transform"
      style={{ cursor: 'nwse-resize' }}
    />
  );
};

/* ============================ SECTION ============================ */

interface ContainerProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const EditableContainer: React.FC<ContainerProps> = ({ id, className = '', children }) => {
  const { isEditMode, state, selectedElement, selectElement } = useEdit();
  const data = state.sections[id] || {};
  const isSelected = selectedElement?.id === id && selectedElement?.type === 'section';
  const [hover, setHover] = useState(false);

  if (data.deleted && !isEditMode) return null;

  const customBlocks = Object.keys(state.texts).filter(k => k.startsWith(`text-block-${id}-`));

  return (
    <div
      id={id}
      onClick={(e) => {
        if (!isEditMode) return;
        e.stopPropagation();
        selectElement({ id, type: 'section', defaultBgColor: data.bgColor, defaultTextColor: data.textColor });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative ${className} ${data.deleted ? 'opacity-30' : ''}`}
      style={{
        // Colour is applied to the inner content via ColorOverride (below) so the
        // section's own rounded corners / styling are preserved — never the wrapper.
        fontSize: data.fontSize || undefined,
        fontFamily: data.fontFamily || undefined,
        outline: isEditMode ? editOutline(isSelected, hover) : undefined,
        outlineOffset: '-3px',
        cursor: isEditMode ? 'pointer' : undefined,
      }}
    >
      {children}

      {customBlocks.map(key => (
        <EditableText key={key} id={key} as="div" className="block mt-2">
          {state.texts[key].content || ''}
        </EditableText>
      ))}

      {/* Kept LAST so the section's real content stays `:first-child` for the override below */}
      <ColorOverride id={id} bgColor={data.bgColor} textColor={data.textColor} />
      {isEditMode && isSelected && <SelectedBadge type="section" onClear={() => selectElement(null)} />}
    </div>
  );
};

/* ============================ TEXT ============================ */

interface TextProps {
  id: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  children: string;
}

export const EditableText: React.FC<TextProps> = ({ id, className = '', as: Component = 'span', children }) => {
  const { isEditMode, state, updateText, selectedElement, selectElement } = useEdit();
  const data = state.texts[id] || {};
  const content = data.content !== undefined ? data.content : children;
  const style = data.style || {};
  const isSelected = selectedElement?.id === id && selectedElement?.type === 'text';
  const [hover, setHover] = useState(false);

  const Tag = Component as any;

  if (!isEditMode) {
    return <Tag className={className} style={style}>{content}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        selectElement({ id, type: 'text', defaultText: content });
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = e.currentTarget.innerText;
        if (next !== content) updateText(id, { content: next });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${className} transition-shadow`}
      style={{
        ...style,
        outline: editOutline(isSelected, hover),
        outlineOffset: '2px',
        borderRadius: '3px',
        cursor: 'text',
      }}
    >
      {content}
    </Tag>
  );
};

/* ============================ MEDIA (img / video) ============================ */

interface MediaProps {
  id: string;
  src: string;
  className?: string;
  alt?: string;
  as?: 'img' | 'video';
  style?: React.CSSProperties;
}

export const EditableMedia: React.FC<MediaProps> = ({ id, src: defaultSrc, className = '', alt = '', as = 'img', style = {} }) => {
  const { isEditMode, state, selectedElement, selectElement, updateMedia } = useEdit();
  const data = state.media[id] || {};
  const src = data.src !== undefined ? data.src : defaultSrc;
  const isSelected = selectedElement?.id === id && selectedElement?.type === 'media';
  const [hover, setHover] = useState(false);
  const mediaRef = useRef<HTMLElement>(null);

  const mediaStyle: React.CSSProperties = {
    width: data.width || undefined,
    height: data.height || undefined,
    borderRadius: data.borderRadius || undefined,
    objectFit: (data.objectFit as any) || undefined,
    ...style,
  };

  const inner = as === 'video'
    ? <video ref={mediaRef as any} src={src} className={className} style={mediaStyle} autoPlay muted loop playsInline />
    : <img ref={mediaRef as any} src={src} className={className} style={mediaStyle} alt={alt} />;

  if (!isEditMode) return inner;

  return (
    <span
      onClick={(e) => { e.stopPropagation(); selectElement({ id, type: 'media', defaultSrc: src }); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-block"
      style={{ outline: editOutline(isSelected, hover), cursor: 'pointer', lineHeight: 0 }}
    >
      {inner}
      {isSelected && <SelectedBadge type="media" onClear={() => selectElement(null)} />}
      {isSelected && (
        <ResizeHandle targetRef={mediaRef} onResize={(w, h) => updateMedia(id, { width: `${w}px`, height: `${h}px` })} />
      )}
    </span>
  );
};

/* ============================ CARD ============================ */

interface CardProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const EditableCard: React.FC<CardProps> = ({ id, className = '', children }) => {
  const { isEditMode, state, selectedElement, selectElement, updateCard } = useEdit();
  const data = state.cards[id] || {};
  const isSelected = selectedElement?.id === id && selectedElement?.type === 'card';
  const [hover, setHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (data.deleted && !isEditMode) return null;

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={(e) => {
        if (!isEditMode) return;
        e.stopPropagation();
        selectElement({ id, type: 'card', defaultBgColor: data.bgColor, defaultTextColor: data.textColor });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative ${className} ${data.deleted ? 'opacity-30' : ''}`}
      style={{
        width: data.width || undefined,
        height: data.height || undefined,
        // Colour / radius applied to the inner card via ColorOverride (below),
        // never the wrapper — keeps the card's own rounded corners.
        outline: isEditMode ? editOutline(isSelected, hover) : undefined,
        cursor: isEditMode ? 'pointer' : undefined,
      }}
    >
      {children}

      {/* Kept LAST so the card's real content stays `:first-child` for the override below */}
      <ColorOverride id={id} bgColor={data.bgColor} textColor={data.textColor} borderRadius={data.borderRadius} />
      {isEditMode && isSelected && <SelectedBadge type="card" onClear={() => selectElement(null)} />}
      {isEditMode && isSelected && (
        <ResizeHandle targetRef={cardRef as React.RefObject<HTMLElement>} onResize={(w, h) => updateCard(id, { width: `${w}px`, height: `${h}px` })} />
      )}
    </div>
  );
};

/* ============================ LIST ============================ */

interface ListProps {
  id: string;
  defaultItems: any[];
  className?: string;
  newItemTemplate?: any;
  as?: keyof JSX.IntrinsicElements;
  itemAs?: keyof JSX.IntrinsicElements;
  children: (item: any, index: number) => React.ReactNode;
}

export const EditableList: React.FC<ListProps> = ({
  id,
  defaultItems,
  className = '',
  newItemTemplate,
  as: Container = 'div',
  itemAs: Item = 'div',
  children,
}) => {
  const { isEditMode, state, updateList } = useEdit();
  const ContainerTag = Container as any;
  const ItemTag = Item as any;

  const processed = defaultItems.map((item, idx) => ({ ...item, id: item.id || `${id}-item-${idx}` }));
  const items = state.lists[id] || processed;

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    updateList(id, next);
  };

  const duplicate = (index: number) => {
    const next = [...items];
    next.splice(index + 1, 0, { ...items[index], id: `${items[index].id}-dup-${Date.now()}` });
    updateList(id, next);
  };

  const remove = (index: number) => {
    if (window.confirm('Delete this item?')) updateList(id, items.filter((_, i) => i !== index));
  };

  const add = () => {
    const item = newItemTemplate ? { ...newItemTemplate, id: `${id}-new-${Date.now()}` } : { id: `${id}-new-${Date.now()}` };
    updateList(id, [...items, item]);
  };

  return (
    <div className="relative">
      <ContainerTag className={className}>
        {items.map((item, index) => (
          <ItemTag key={item.id} className="relative group/li">
            {isEditMode && (
              <span className="absolute top-2 right-2 z-[80] flex items-center gap-1 bg-brand-navy/95 border border-brand-teal/30 p-1 rounded-lg shadow-xl opacity-0 group-hover/li:opacity-100 transition-opacity">
                <button onClick={() => move(index, -1)} disabled={index === 0} className="text-cream hover:text-brand-teal p-1 disabled:opacity-30" title="Move up/left">
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="text-cream hover:text-brand-teal p-1 disabled:opacity-30" title="Move down/right">
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button onClick={() => duplicate(index)} className="text-brand-navy bg-brand-teal px-1.5 py-0.5 rounded" title="Duplicate">
                  <Copy className="w-3 h-3" />
                </button>
                <button onClick={() => remove(index)} className="text-cream bg-red-500 px-1.5 py-0.5 rounded" title="Delete">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            )}
            {children(item, index)}
          </ItemTag>
        ))}
      </ContainerTag>
      {isEditMode && (
        <div className="mt-4 flex justify-center">
          <button onClick={add} className="bg-brand-teal hover:bg-brand-teal-bright text-brand-navy px-4 py-2 rounded-full text-xs font-black uppercase flex items-center gap-1.5 shadow-lg">
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        </div>
      )}
    </div>
  );
};
