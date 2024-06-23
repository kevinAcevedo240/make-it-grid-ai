'use client'

import React, { useContext } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridSettings from './GridSettings';
import { TrashIcon} from "@radix-ui/react-icons";
import { Button } from './ui/button';
import { GridContext } from '@/hooks/useGridContext';
import GuideButton from './Guide-Button';


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
  } = useContext(GridContext)

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

       <GuideButton/>

        <div className="grid-step flex flex-col m-auto w-full  pb-9 pt-4 ">
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
                      className="relative border border-gray-400 dark:border-gray-100 transition-all duration-300 hover:bg-secondary/30 rounded-lg h-full flex items-center justify-center z-0"
                      style={{ zIndex: 1 }}
                    >
                      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full size-6 sm:size-8 flex items-center justify-center cursor-pointer z-1">
                        <span className="text-xl sm:text-2xl">+</span>
                      </button>
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
                    className="relative text-white bg-primary border flex justify-center items-center border-white rounded-lg p-3 shadow-lg z-20"
                  >
                    <button
                      className="absolute top-0 right-0 m-1 p-1 bg-muted/80 text-white rounded-full size-6 flex items-center justify-center cursor-pointer z-auto"
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
                    {item.i}
                  </div>
                ))}
              </ResponsiveGridLayout>
            )}
          </div>
        </div>
        <div className="h-28"></div>
      </div>
    );
};

export default GridLayout;
