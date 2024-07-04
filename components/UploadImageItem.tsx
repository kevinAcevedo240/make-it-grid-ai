import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import * as Icons from "@/components/icons/icons";

interface UploadButtonProps {
  itemId: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
  isMobile: boolean;
  isDesktopOrLaptop: boolean;
  selectedItem: string | null;
}

const UploadImage: React.FC<UploadButtonProps> = ({ itemId, handleImageChange, isMobile, isDesktopOrLaptop, selectedItem }) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`upload-button absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0 m-1 p-1 bg-gray-800 dark:bg-white shadow-md text-white rounded-full size-7 flex items-center justify-center cursor-pointer z-10 
               ${isMobile ? "-translate-x-1/2 -translate-y-1/2" : "md:-translate-y-0 md:translate-x-0"}
              ${!isDesktopOrLaptop && selectedItem !== itemId ? "hidden" : "block"} md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100`}
            onClick={(e) => {
              e.stopPropagation();
              const inputElement = document.getElementById(`upload-${itemId}`);
              if (inputElement) {
                inputElement.click();
              }
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              const inputElement = document.getElementById(`upload-${itemId}`);
              if (inputElement) {
                inputElement.click();
              }
            }}
          >
            <Icons.upload className="size-4 dark:text-muted" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="md:block hidden">
          Upload Image
        </TooltipContent>
      </Tooltip>
      <input
        type="file"
        id={`upload-${itemId}`}
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => handleImageChange(e, itemId)}
      />
    </>
  );
};

export default UploadImage;
