'use client'

import React, { useContext, useState, useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridSettings from './GridSettings';
import { TrashIcon } from "@radix-ui/react-icons";
import * as Icons from "@/components/icons";
import { GridContext } from '@/context/useGridContext';
import { useMediaQuery } from 'react-responsive';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from 'next/image';

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

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });

  const breakpoints = { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 };
  const colsResponsive = {
    lg: Math.max(cols, 1),
    md: Math.max(cols, 1),
    sm: Math.max(cols, 1),
    xs: Math.max(cols, 1),
    xxs: Math.max(cols, 1)
  };

  // Actualiza los elementos del layout para que sean estáticos si no es escritorio/portátil
  const updatedLayout = layout.map(item => ({
    ...item,
    static: !isDesktopOrLaptop && selectedItem !== item.i
  }));

  // Agrega un efecto para manejar la deselección al hacer clic fuera
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

  const handleDeleteItem = (itemId: string) => {
    deleteItem(itemId);
    setImages((prevImages) => {
      const newImages = { ...prevImages };
      delete newImages[itemId];
      return newImages;
    });
  };

  // Actualiza la función de manejo de clics en los ítems
  const handleItemClick = (itemId: string) => {
    if (!isDesktopOrLaptop) {
      console.log("item seleccionado: ", itemId);
      setSelectedItem(prevSelectedItem => {
        if (prevSelectedItem === itemId) {
          return null; // Si el ítem ya está seleccionado, deselecciónalo
        }
        return itemId; // Selecciona el nuevo ítem
      });
    }
  };

  return (
    <div className="mt-8">
      <GridSettings />

      <div ref={gridStepRef} className="m-1 px-1 md:px-4"
      style={{paddingBottom:`${(rows * 4) + (gap >= 9 ? gap * 14 : gap * 10)}px`}}
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
                {Array.from({ length: rows * cols }).map((_, index) => {
                  const x = index % cols;
                  const y = Math.floor(index / cols);
                  return (
                    <div
                      key={index}
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
                isDraggable={isDesktopOrLaptop || (selectedItem !== null)}
                isResizable={isDesktopOrLaptop || (selectedItem !== null)}
                onLayoutChange={(layout) => setLayout(layout)}
              >
                {updatedLayout.map((item) => (
                  <div
                    key={item.i}
                    onClick={() => handleItemClick(item.i)}
                    className="relative text-white bg-primary border flex justify-center items-center border-white rounded-lg p-3 shadow-lg z-20 cursor-pointer group transition-all duration-250 ease-in-out delay-100"
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

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`delete-button absolute top-0 right-0 m-1 p-1 bg-muted/80 text-white rounded-full size-6 flex items-center justify-center cursor-pointer z-10 ${
                            (!isDesktopOrLaptop && selectedItem !== item.i) ? "hidden" : "block"
                          } md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item.i);
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(item.i);
                          }}
                        >
                          <TrashIcon className="size-4 text-destructive dark:text-white" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="md:block hidden">
                        Delete
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`upload-button absolute top-0 left-0 m-1 p-1 bg-muted/80 text-white rounded-full size-6 flex items-center justify-center cursor-pointer z-10 ${
                            (!isDesktopOrLaptop && selectedItem !== item.i) ? "hidden" : "block"
                          } md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100`}
                          onClick={(e) => {
                            e.stopPropagation();
                            const inputElement = document.getElementById(`upload-${item.i}`);
                            if (inputElement) {
                              inputElement.click();
                            }
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            const inputElement = document.getElementById(`upload-${item.i}`);
                            if (inputElement) {
                              inputElement.click();
                            }
                          }}
                        >
                          <Icons.upload className="size-3 text-destructive dark:text-white" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="md:block hidden">
                        Upload Image
                      </TooltipContent>
                    </Tooltip>

                    <input
                      type="file"
                      id={`upload-${item.i}`}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, item.i)}
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
