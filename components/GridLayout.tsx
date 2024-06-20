import React, { useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridSettings from './GridSettings';
import { TrashIcon  } from "@radix-ui/react-icons";
import { Button } from './ui/button';
import GeneratedCodeCard from './GenerateCodeCard';
import useGridItems from '@/hooks/useGridItems';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LayoutItem } from '@/types';
import { randomizeGrid } from '@/utils/RandomGrid';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = () => {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [gap, setGap] = useState(2);
    const codeContainerRef = useRef<HTMLPreElement>(null);

    const { layout, addItem, deleteItem, setLayout } = useGridItems([]);

    const handleResetGrid = () => {
        setLayout([]);
        setRows(3);
        setCols(3);
        setGap(2);
    };

    const handleRandomizeGrid = () => {
      randomizeGrid(setRows, setCols, setLayout);
  };
  
  

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
        <TooltipProvider>
          <GridSettings
            rows={rows}
            cols={cols}
            gap={gap}
            setRows={(value) => setRows(Math.max(0, value))}
            setCols={(value) => setCols(Math.max(0, value))}
            setGap={setGap}
          />

          <div className="flex my-8 gap-4">
            <Button
              onClick={handleResetGrid}
              className="p-2 border-primary border dark:bg-primary/0 hover:-translate-y-2 transition-all duration-300"
            >
              Reset Grid
            </Button>
            <div>
              <div className=" absolute left-[60%] md:left-[18%] xl:left-[20%] 2xl:left-[24%] top-44 md:top-32  text-sm lg:flex flex-col items-center animate-opacity">
                <i className="text-muted-foreground text-xs md:text-sm pl-4 ">
                Do you want a <br/> crazy grid layout?
                </i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-undo size-12 md:size-16 -ml-4 md:ml-0 text-muted-foreground transform scale-y-[-1] md:-rotate-[35deg]"
                  // style={{ transform: 'scaleY(-1) rotate(35deg)' }}
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
              </div>
              <Button
                onClick={handleRandomizeGrid}
                className="p-2 border-primary border dark:bg-primary/0 hover:-translate-y-2 transition-all duration-300"
              >
                Randomize
              </Button>
            </div>
          </div>
          <div
            className="relative w-full"
            style={{
              paddingBottom: `calc(${rows} * 100px)`,
            }}
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
          <GeneratedCodeCard
            rows={rows}
            cols={cols}
            gap={gap}
            layout={layout}
            codeContainerRef={codeContainerRef}
          />
        </TooltipProvider>
      </div>
    );
};

export default GridLayout;
