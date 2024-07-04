import React from 'react';

interface EmptyItemProps {
  x: number;
  y: number;
  addItem: (x: number, y: number) => void;
  isDesktopOrLaptop: boolean;
  isMobile: boolean;
  cols: number;
}

const EmptyItem: React.FC<EmptyItemProps> = ({ x, y, addItem, isDesktopOrLaptop, isMobile, cols }) => {
  return (
    <div
      onClick={() => addItem(x, y)}
      className="empty-item relative border border-muted-foreground/30 dark:border-gray-100 transition-all duration-300 hover:bg-secondary/30 rounded-lg h-full flex items-center justify-center z-0 cursor-pointer"
      style={{ zIndex: 1 }}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full ${
          (isMobile || !isDesktopOrLaptop) && cols >= 8
            ? "size-5"
            : "size-6 sm:size-8"
        } flex items-center justify-center  z-1`}
      >
        <span className="text-xl sm:text-2xl">+</span>
      </div>
    </div>
  );
};

export default EmptyItem;
