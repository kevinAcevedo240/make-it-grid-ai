import React from 'react';

type GridProps = {
  rows: number;
  cols: number;
  gap: number;
  items: any[];
  onDrop: (id: string, position: string) => void;
  onResize: (id: string, size: { width: number; height: number }) => void;
};

const Grid = ({ rows, cols, gap, items, onDrop, onResize }: GridProps) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    onDrop(id, position);
  };

  const renderGrid = () => {
    const gridItems = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const position = `${i}-${j}`;
        gridItems.push(
          <div
            key={position}
            data-position={position}
            onDrop={(e) => handleDrop(e, position)}
            onDragOver={(e) => e.preventDefault()}
            className="border border-gray-300 relative rounded-lg"
            style={{ minWidth: '100px', minHeight: '100px' }}
          >
            {items.filter(item => item.position === position).map(item => (
              <div
                key={item.id}
                className="p-2 bg-primary text-white absolute rounded-lg w-full h-full"
                // style={{ width: item.size.width, height: item.size.height }}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text", item.id)}
              >
                {item.id}
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleResizeStart(e, item.id)}
                />
              </div>
            ))}
          </div>
        );
      }
    }
    return gridItems;
  };

  const handleResizeStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const item = items.find(item => item.id === id);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = item.size.width + (moveEvent.clientX - startX);
      const newHeight = item.size.height + (moveEvent.clientY - startY);
      onResize(id, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(100px, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(100px, 1fr))`,
        gap: `${gap * 8}px`, // Tailwind uses 0.5rem as 1 gap unit, 8px = 0.5rem
      }}
    >
      {renderGrid()}
    </div>
  );
};

export default Grid;
