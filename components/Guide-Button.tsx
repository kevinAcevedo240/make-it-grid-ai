import React from 'react';
import { Button } from './ui/button';
import { useTour } from '@reactour/tour'
import * as Icons from "@/components/icons";

const GuideButton: React.FC = () => {

    const { setIsOpen,setCurrentStep } = useTour()

    const handleOpenTour = () => {
        setCurrentStep(0); 
        setIsOpen(true);
      };

    return (
        <Button onClick={handleOpenTour} className="gap-2 rounded-full sm:rounded-xl">
          <Icons.Info className="size-5 text-white" />
          <span className='hidden md:block'>Quick Tour</span>
        </Button>
    );
};

export default GuideButton;