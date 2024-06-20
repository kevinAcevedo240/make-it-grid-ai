import { LayoutItem } from '@/types';
import { useState } from 'react';

const useGridItems = (initialLayout: LayoutItem[] = []) => {
    const [layout, setLayout] = useState<LayoutItem[]>(initialLayout);

    const addItem = (x: number, y: number) => {
        const newItemKey = `${layout.length + 1}`;
        const newItem: LayoutItem = {
            i: newItemKey,
            x: x,
            y: y,
            w: 1,
            h: 1
        };

        const exists = layout.some(item => item.x === x && item.y === y);

        if (!exists) {
            setLayout([...layout, newItem]);
        } else {
            const updatedLayout = layout.map(item => {
                if (item.y >= y) {
                    return { ...item, y: item.y + 1 };
                }
                return item;
            });
            setLayout([...updatedLayout, newItem]);
        }
    };

    const deleteItem = (id: string) => {
        setLayout(layout.filter(item => item.i !== id));
    };

    return {
        layout,
        addItem,
        deleteItem,
        setLayout
    };
};

export default useGridItems;