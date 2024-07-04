import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TrashIcon } from "@radix-ui/react-icons";

interface DeleteButtonProps {
  itemId: string;
  handleDeleteItem: (itemId: string) => void;
  isMobile: boolean;
  isDesktopOrLaptop: boolean;
  selectedItem: string | null;
}

const DeleteItem: React.FC<DeleteButtonProps> = ({ itemId, handleDeleteItem, isMobile, isDesktopOrLaptop, selectedItem }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`delete-button absolute top-0 translate-x-1/2 -translate-y-1/2 right-0 m-1 p-1 bg-gray-800 dark:bg-white shadow-md text-white rounded-full size-7 flex items-center justify-center cursor-pointer z-30 
            ${isMobile ? "translate-x-1/2 -translate-y-1/2" : "md:-translate-y-0 md:translate-x-0"}
            ${!isDesktopOrLaptop && selectedItem !== itemId ? "hidden" : "block"} 
            md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100`}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteItem(itemId);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            handleDeleteItem(itemId);
          }}
        >
          <TrashIcon className="size-5 dark:text-destructive" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="md:block hidden">
        Delete
      </TooltipContent>
    </Tooltip>
  );
};

export default DeleteItem;
