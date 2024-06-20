import React from 'react';
import { TrashIcon } from "@radix-ui/react-icons";

interface GridItemProps {
    item: { i: string };
    onDelete: (id: string) => void;
}

const GridItem: React.FC<GridItemProps> = ({ item, onDelete }) => {
    return (
        <div
            className="relative text-white bg-primary border flex justify-center items-center border-white rounded-lg p-3 shadow-lg z-10"
        >
            <button
                className="absolute top-0 right-0 m-1 p-1 bg-muted/80 text-white rounded-full size-6 flex items-center justify-center cursor-pointer z-20"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.i);
                }}
            >
                <TrashIcon className="size-4 text-destructive" />
            </button>
            {item.i}
        </div>
    );
};

export default GridItem;
