import { LayoutItem } from '@/types';
import { useState, useCallback } from 'react';

const useGridItems = (initialLayout: LayoutItem[] = []) => {
  const [layout, setLayout] = useState<LayoutItem[]>(initialLayout);
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [gap, setGap] = useState(2);

  const addItem = useCallback((x: number, y: number) => {
    const newItemKey = `${layout.length + 1}`;
    const newItem: LayoutItem = {
      i: newItemKey,
      x: x,
      y: y,
      w: 1,
      h: 1,
    };

    const exists = layout.some(item => item.x === x && item.y === y);

    if (!exists) {
      setLayout(prevLayout => [...prevLayout, newItem]);
    } else {
      const updatedLayout = layout.map(item => {
        if (item.y >= y) {
          return { ...item, y: item.y + 1 };
        }
        return item;
      });
      setLayout([...updatedLayout, newItem]);
    }
  }, [layout]);

  const deleteItem = useCallback((id: string) => {
    setLayout(prevLayout => prevLayout.filter(item => item.i !== id));
  }, []);

  const randomizeGrid = useCallback(() => {
    console.log('Randomized grid');

    const randomRows = Math.floor(Math.random() * 5) + 2; // Random rows between 2 and 6
    const randomCols = Math.floor(Math.random() * 5) + 2; // Random cols between 2 and 6

    // Create a grid of available spaces
    const availableSpaces = Array.from({ length: randomRows }, () =>
      Array(randomCols).fill(true)
    );

    const newLayout: LayoutItem[] = [];

    const addItemToLayout = (x: number, y: number, w: number, h: number) => {
      // Adjust width and height if they exceed the grid bounds
      w = Math.min(w, randomCols - x);
      h = Math.min(h, randomRows - y);

      // Check if the item fits within grid bounds
      if (x >= 0 && y >= 0 && x + w <= randomCols && y + h <= randomRows) {
        newLayout.push({ i: `${newLayout.length}`, x, y, w, h });

        // Mark cells as occupied
        for (let row = y; row < y + h; row++) {
          for (let col = x; col < x + w; col++) {
            availableSpaces[row][col] = false;
          }
        }
      }
    };

    

    const getRandomSize = (maxWidth: number, maxHeight: number) => {
      const w = Math.floor(Math.random() * Math.min(2, maxWidth)) + 1;
      const h = Math.floor(Math.random() * Math.min(2, maxHeight)) + 1;
      return { w, h };
    };

    // Generate initial layout
    for (let y = 0; y < randomRows; y++) {
      for (let x = 0; x < randomCols; x++) {
        if (availableSpaces[y][x]) {
          const { w, h } = getRandomSize(randomCols - x, randomRows - y);
          addItemToLayout(x, y, w, h);
        }
      }
    }

    // Fill remaining empty spaces
    for (let y = 0; y < randomRows; y++) {
      for (let x = 0; x < randomCols; x++) {
        if (availableSpaces[y][x]) {
          addItemToLayout(x, y, 1, 1); // Fill with a 1x1 item
        }
      }
    }

    // Filter out items that are out of bounds (just in case)
    const filteredLayout = newLayout.filter(
      item =>
        item.x >= 0 &&
        item.y >= 0 &&
        item.x + item.w <= randomCols &&
        item.y + item.h <= randomRows
    );

    // Set the generated layout, rows, and columns
    setLayout(filteredLayout);
    setRows(randomRows);
    setCols(randomCols);

    
  }, []);

  const ResetGrid = () => {
    setLayout([]);
    setRows(3);
    setCols(3);
    setGap(2);
};

  return {
    layout,
    addItem,
    deleteItem,
    setLayout,
    rows,
    cols,
    gap,
    setGap,
    setRows,
    setCols,
    randomizeGrid,
    ResetGrid,
  };
};

export default useGridItems;
