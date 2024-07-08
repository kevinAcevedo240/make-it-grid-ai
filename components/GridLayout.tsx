'use client'

import React, { useContext, useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridSettings from './GridSettings';
import { GridContext } from '@/context/useGridContext';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import EmptyItem from './EmptyItem';
import UploadImage from './UploadImageItem';
import DeleteItem from './DeleteItem';

// Wrap ResponsiveGridLayout with WidthProvider for better handling of dynamic widths
const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout: React.FC = () => {
  const {
    rows,
    cols,
    layout,
    gap,
    addItem,
    deleteItem,
    setLayout,
    isMobile,
    gridStepRef,
    setImages,
    images,
  } = useContext(GridContext);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Determine if the device is a desktop or laptop using media query
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });

  // Breakpoints and responsive column configuration
  const breakpoints = { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 };
  const colsResponsive = {
    lg: Math.max(cols, 1),
    md: Math.max(cols, 1),
    sm: Math.max(cols, 1),
    xs: Math.max(cols, 1),
    xxs: Math.max(cols, 1)
  };

  // Update layout items to be static if the device is not desktop/laptop and the item is not selected
  const updatedLayout = layout.map(item => ({
    ...item,
    static: !isDesktopOrLaptop && selectedItem !== item.i
  }));

  // Handle click outside the grid to deselect items
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gridStepRef?.current && !gridStepRef.current.contains(event.target as Node)) {
        setSelectedItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [gridStepRef]);

  // Handle image upload and convert the uploaded image to base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => ({
          ...prevImages,
          [itemId]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle item deletion and remove associated image
  const handleDeleteItem = (itemId: string) => {
    deleteItem(itemId);
    setImages((prevImages) => {
      const newImages = { ...prevImages };
      delete newImages[itemId];
      return newImages;
    });
  };

  // Handle item click for selection in mobile view
  const handleItemClick = (itemId: string) => {
    if (!isDesktopOrLaptop) {
      setSelectedItem(itemId);
    }
  };

  //Handle item click for selection in mobile view when add a new item
  const handleAddItemClick = (x: number, y: number) => {
    return () => {
      const newItemId = addItem(x, y);
      if (!isDesktopOrLaptop) {
        setSelectedItem(newItemId);
      }
    };
  };

  return (
    <div className="mt-8">
      <GridSettings />
      <div
        ref={gridStepRef}
        className="m-1 px-1 md:px-4"
        style={{
          paddingBottom: `${rows * 4 + (gap >= 9 ? gap * 14 : gap * 10)}px`,
        }}
      >
        <div
          className={`grid-step flex flex-col m-auto z-10 transition-all duration-250 ease-in-out delay-100 
          ${
            isMobile && isDesktopOrLaptop
              ? "mobile-mode p-5 overflow-y-auto no-scrollbar w-[410px] 2xl:h-[min(68vh,900px)] h-[min(53vh,900px)] bg-white dark:bg-transparent shadow-custom dark:shadow-dark-custom border-8 border-muted dark:border-8 dark:border-muted rounded-[50px] mb-[5rem]"
              : "pb-14 pt-4 w-full"
          }`}
        >
          <div
            className="relative"
            style={{ width: "100%", height: `${rows * 100}px` }}
          >
            {cols > 0 && rows > 0 && (
              <div
                className="grid w-full absolute"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${rows}, minmax(100px, 1fr))`,
                  gap: `${gap * 4}px`,
                  padding: `${gap * 4}px 0`,
                }}
              >
                {/* Render empty items for grid slots */}
                {Array.from({ length: rows * cols }).map((_, index) => {
                  const x = index % cols;
                  const y = Math.floor(index / cols);
                  return (
                    <EmptyItem
                      key={index}
                      x={x}
                      y={y}
                      addItem={handleAddItemClick(x, y)}
                      isDesktopOrLaptop={isDesktopOrLaptop}
                      isMobile={isMobile}
                      cols={cols}
                    />
                  );
                })}
              </div>
            )}
            {cols > 0 && (
              <ResponsiveGridLayout
                style={{ paddingTop: `${gap * 4}px` }}
                layouts={{ lg: updatedLayout }}
                breakpoints={breakpoints}
                cols={colsResponsive}
                useCSSTransforms={true}
                rowHeight={100}
                margin={[gap * 4, gap * 4]}
                compactType={null}
                containerPadding={[0, 0]}
                isDraggable={isDesktopOrLaptop || selectedItem !== null}
                isResizable={isDesktopOrLaptop || selectedItem !== null}
                onLayoutChange={(updatedLayout) => setLayout(updatedLayout)}
              >
                {/* Render each grid item with its respective image, delete, and upload buttons */}
                {updatedLayout.map((item) => (
                  <div
                    key={item.i}
                    onClick={() => handleItemClick(item.i)}
                    className={`relative text-white bg-primary flex justify-center items-center  rounded-lg p-3 shadow-lg z-20 cursor-grab active:cursor-grabbing group transition-all duration-250 ease-in-out delay-100
                      ${
                        !isDesktopOrLaptop && selectedItem === item.i
                          ? "border-2 dark:border-white border-gray-800"
                          : "border border-gray-800 dark:border-white md:duration-300 md:dark:hover:border-white md:hover:border-gray-800 md:hover:border-[3px]"
                      }
                       `}
                  >
                    {images[item.i] &&
                      typeof images[item.i] === "string" &&
                      (images[item.i] as string)?.length && (
                        <Image
                          height={100}
                          width={100}
                          src={images[item.i] as string}
                          alt="Grid item"
                          className="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
                        />
                      )}

                    <DeleteItem
                      itemId={item.i}
                      handleDeleteItem={handleDeleteItem}
                      isMobile={isMobile}
                      isDesktopOrLaptop={isDesktopOrLaptop}
                      selectedItem={selectedItem}
                    />

                    <UploadImage
                      itemId={item.i}
                      handleImageChange={handleImageChange}
                      isMobile={isMobile}
                      isDesktopOrLaptop={isDesktopOrLaptop}
                      selectedItem={selectedItem}
                    />

                    <div className="relative z-10 item-id">{item.i}</div>
                  </div>
                ))}
              </ResponsiveGridLayout>
            )}
          </div>
        </div>
      </div>

      {isMobile && isDesktopOrLaptop ? "" : <div className="h-28"></div>}
    </div>
  );
};

export default GridLayout;
