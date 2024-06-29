'use client'

import React, { useContext } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridSettings from './GridSettings';
import { TrashIcon} from "@radix-ui/react-icons";
import { GridContext } from '@/context/useGridContext';
import { useMediaQuery } from 'react-responsive';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = () => {
  const {
    rows,
    cols,
    layout,
    gap,
    addItem,
    deleteItem,
    setLayout,
    setRows,
    setCols,
    setGap,
    isMobile,
  } = useContext(GridContext)

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 }); // Media query for desktop

    const breakpoints = { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 };
    const colsResponsive = { 
        lg: Math.max(cols, 1), 
        md: Math.max(cols, 1), 
        sm: Math.max(cols, 1), 
        xs: Math.max(cols, 1), 
        xxs: Math.max(cols, 1) 
    };


    return (
      <div className="mt-8">
        <GridSettings
          rows={rows}
          cols={cols}
          gap={gap}
          setRows={(value) => setRows(Math.max(0, value))}
          setCols={(value) => setCols(Math.max(0, value))}
          setGap={setGap}
        />

        <div
         className={`grid-step flex flex-col m-auto z-10 transition-all duration-250 ease-in-out delay-100 
          ${
            isMobile && isDesktopOrLaptop
              ? "p-5 overflow-y-auto no-scrollbar w-[410px] 2xl:h-[min(68vh,900px)] h-[min(53vh,900px)] bg-white dark:bg-transparent shadow-custom dark:shadow-dark-custom border-8 border-muted dark:border-8 dark:border-muted rounded-[50px] mb-[5rem]"
              : "pb-9 pt-4 w-full"
          }`}
        
        >
          <div
            className="relative "
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
                      className="relative border border-muted-foreground/30 dark:border-gray-100 transition-all duration-300 hover:bg-secondary/30 rounded-lg h-full flex items-center justify-center z-0 cursor-pointer"
                      style={{ zIndex: 1 }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full size-6 sm:size-8 flex items-center justify-center  z-1">
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
                layouts={{ lg: layout }}
                breakpoints={breakpoints}
                cols={colsResponsive}
                useCSSTransforms={true}
                rowHeight={100}
                margin={[gap * 4, gap * 4]}
                compactType={null}
                containerPadding={[0, 0]}
                isDraggable={true}
                isResizable={true}
                onLayoutChange={(layout) => setLayout(layout)}
              >
                {layout.map((item) => (
                  <div
                    key={item.i}
                    className="relative text-white bg-primary border flex justify-center items-center border-white rounded-lg p-3 shadow-lg z-20 cursor-grab active:cursor-grabbing group transition-all duration-250 ease-in-out delay-100 "
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="absolute top-0 right-0 m-1 p-1 bg-muted/80 text-white rounded-full size-6 flex items-center justify-center cursor-pointer z-auto opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(item.i);
                          }}
                          onTouchEnd={(e) => {
                            e.stopPropagation();
                            deleteItem(item.i);
                          }}
                        >
                          <TrashIcon className="size-4 text-destructive" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="md:block hidden">
                        Delete
                      </TooltipContent>
                    </Tooltip>

                    {item.i}
                  </div>
                ))}
              </ResponsiveGridLayout>
            )}
          </div>
        </div>
        {isMobile && isDesktopOrLaptop ? "" : <div className="h-28"></div>}
      </div>
    );
};

export default GridLayout;
