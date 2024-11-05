import React from 'react';
import { Button } from './ui/button';
import { useTour } from '@reactour/tour'
import * as Icons from "@/components/icons/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FeedbackButton: React.FC = () => {

    const { setIsOpen,setCurrentStep } = useTour()

    const handleOpenFeedback = () => {
      window.open('https://makeitgrid.featurebase.app/', '_blank');
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="feedback"
            onClick={handleOpenFeedback}
            className="gap-2 rounded-xl sm:rounded-xl z-30 border-primary border bg-white dark:bg-primary/0 active:scale-90"
          >
            <Icons.ClipboardPen className="size-5 text-primary dark:text-white" />
            <span className="hidden md:block  text-lg text-primary dark:text-white">Feedback</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="md:block hidden">
          Feel free to provide your feedback or request by clicking here
        </TooltipContent>
      </Tooltip>
    );
};

export default FeedbackButton;