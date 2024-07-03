import React from 'react';
import { Button } from './ui/button';
import { useTour } from '@reactour/tour'
import * as Icons from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GuideButton: React.FC = () => {

    const { setIsOpen,setCurrentStep } = useTour()

    const handleOpenTour = () => {
        setCurrentStep(0); 
        setIsOpen(true);
      };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Quick Tour"
            onClick={handleOpenTour}
            className="gap-2 rounded-xl sm:rounded-xl z-30 border-primary border dark:bg-primary/0 active:scale-90"
          >
            <Icons.Info className="size-5 text-white" />
            <span className="hidden md:block  text-lg">Quick Tour</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="md:block hidden">
          Learn how to use it effortlessly with this quick tutorial.
        </TooltipContent>
      </Tooltip>
    );
};

export default GuideButton;