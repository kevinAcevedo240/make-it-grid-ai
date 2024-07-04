import React, { useContext } from 'react';
import { toPng } from 'html-to-image';
import * as Icons from "@/components/icons/icons";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";// Import your context
import { GridContext } from '@/context/useGridContext';

const DownloadAsImage: React.FC = () => {
  const { gridStepRef } = useContext(GridContext);  // Access the gridStepRef from context

  // Filter function to exclude certain classes
  const filter = (node: HTMLElement) => {
    const exclusionClasses = ['item-id', 'delete-button', 'upload-button', 'empty-item', 'react-resizable-handle'];
    return !exclusionClasses.some((classname) => node.classList?.contains(classname));
  };

  // Handle download image
  const handleDownloadImage = () => {
    if (gridStepRef && gridStepRef.current) {
      toPng(gridStepRef.current, { filter: filter })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'grid-layout.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Failed to generate image', err);
        });
    } else {
      console.error('Grid reference is undefined');
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleDownloadImage}
          className="download-step gap-2 dark:border-primary bg-muted-foreground dark:border dark:bg-transparent active:scale-90"
        >
          <Icons.Download className="size-5 text-white" />
          <span className="hidden md:block text-white">Download</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="md:block hidden text-center">
        Download Grid as Image
      </TooltipContent>
    </Tooltip>
  );
};

export default DownloadAsImage;
