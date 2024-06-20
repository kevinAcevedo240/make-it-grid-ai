import React, { useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridSettings from './GridSettings';
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from './ui/button';
import GeneratedCodeCard from './GenerateCodeCard';
import useGridItems from '@/hooks/useGridItems';

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

    const breakpoints = { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 };
    const colsResponsive = { lg: cols, md: cols, sm: cols, xs: cols, xxs: cols };

    return (
      <div className="mt-8">
        <GridSettings
          rows={rows}
          cols={cols}
          gap={gap}
          setRows={(value) => setRows(Math.max(0, value))}
          setCols={(value) => setCols(Math.max(1, value))}
          setGap={setGap}
        />
        <div className="flex my-6 gap-4">
          <Button
            onClick={handleResetGrid}
            className="p-2 border-primary border dark:bg-primary/0 hover:-translate-y-2 transition-all duration-300"
          >
            Reset Grid
          </Button>
        </div>
        <div
          className="relative w-full"
          style={{
            paddingBottom: `calc(${rows} * 100px + ${
              gap * 4 * (rows - 1)
            }px + 1rem)`,
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
                className="relative text-white bg-primary border flex justify-center items-center border-white rounded-lg p-3 shadow-lg z-10"
              >
                <button
                  className="absolute top-0 right-0 m-1 p-1 bg-muted/80 text-white rounded-full size-6 flex items-center justify-center cursor-pointer z-20"
                  onClick={(e) => {
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
        </div>
        <GeneratedCodeCard
                rows={rows}
                cols={cols}
                gap={gap}
                layout={layout}
                codeContainerRef={codeContainerRef}
            />
        
      </div>
    );
};

export default GridLayout;