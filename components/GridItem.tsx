import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface GridItemProps {
  id: string;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-2 bg-blue-500 text-white cursor-move">
      {children}
    </div>
  );
};

export default GridItem;
