import React from 'react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { MobileIcon, DesktopIcon } from "@radix-ui/react-icons"; 

interface ResponsiveGridControlsProps {
  handleResetGrid: () => void;
}

const GridControls: React.FC<ResponsiveGridControlsProps> = ({ handleResetGrid }) => {
  return (
    <div className="flex my-8 gap-4 justify-start items-center">
      <Button
        onClick={handleResetGrid}
        className="p-2 border-primary border dark:bg-primary/0 hover:-translate-y-2 transition-all duration-300"
      >
        Reset Grid
      </Button>
      <div className="relative">
      <div className=" absolute left-[60%] md:left-[18%] xl:left-[20%] 2xl:left-[24%] top-44 md:top-32  text-sm lg:flex flex-col items-center animate-opacity">
        <i className="text-muted-foreground text-xs md:text-sm pl-4 ">
            Make Your
            <br />
            Grid Responsive!
          </i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-undo size-12 md:size-16 -ml-4 md:ml-0 text-muted-foreground transform scale-y-[-1] md:-rotate-[35deg]"
          >
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
          </svg>
        </div>
        <Tabs defaultValue="mobile" className="overflow-x-auto rounded-lg">
          <TabsList className="bg-muted-foreground/10 dark:bg-muted h-12">
            <TabsTrigger value="mobile">
              <MobileIcon className="size-6" />
            </TabsTrigger>
            <TabsTrigger value="desktop">
              <DesktopIcon className="size-6" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default GridControls;
