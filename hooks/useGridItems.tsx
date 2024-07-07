import { LayoutItem } from '@/types';
import { useState, useCallback, useEffect, useRef } from 'react';

// Default values for the grid
const defaultRows = 3;
const defaultCols = 3;
const defaultGap = 2;
const defaultLayout: LayoutItem[] = [];

const useGridItems = (initialLayout: LayoutItem[] = []) => {
  const [layout, setLayout] = useState<LayoutItem[]>(initialLayout);
  const [rows, setRows] = useState<number>(defaultRows);
  const [cols, setCols] = useState<number>(defaultCols);
  const [gap, setGap] = useState(defaultGap);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const gridStepRef = useRef<HTMLDivElement>(null); 
  const [images, setImages] = useState<Record<string, string | ArrayBuffer | null>>({});
  const [loading, setLoading] = useState(false);

  // Save layout to local storage base on the selected Mode
  const saveToLocalStorage = useCallback((mode: 'desktop' | 'mobile', data: any) => {
    localStorage.setItem(`grid-${mode}`, JSON.stringify(data));
  }, []);


  // Load layout from local storage base on the selected Mode
  const loadFromLocalStorage = useCallback((mode: 'desktop' | 'mobile') => {
    
    const storedData = localStorage.getItem(`grid-${mode}`);
    if (storedData) {
      const { rows, cols, gap } = JSON.parse(storedData);
      setRows(rows);
      setCols(cols);
      setGap(gap);
      return { rows, cols, gap };
    } else {
      setRows(defaultRows);
      setCols(defaultCols);
      setGap(defaultGap);
      return {
        rows: defaultRows,
        cols: defaultCols,
        gap: defaultGap,
      };
    }
  }, [setRows, setCols, setGap]);

  // Load layout from local storage base on the selected Mode
  const loadFromLocalStorageLayout = useCallback((mode: 'desktop' | 'mobile') => {
    
    const storedData = localStorage.getItem(`grid-${mode}`);
    if (storedData) {
      const { layout } = JSON.parse(storedData);
      
      setLayout(layout);
      return {layout };
    } else {
      setLayout(defaultLayout);
      return {
        layout: defaultLayout,
      };
    }
  }, [setLayout, isMobile]);

  // Reset grid values to default on page load
  useEffect(() => {
    const defaultData = { rows: defaultRows, cols: defaultCols, gap: defaultGap, layout: defaultLayout };
    saveToLocalStorage('desktop', defaultData);
    saveToLocalStorage('mobile', defaultData);
    setRows(defaultRows);
    setCols(defaultCols);
    setGap(defaultGap);
    setLayout(defaultLayout);
  }, []);

  // Load layout from local storage when isMobile changes
  useEffect(() => {
    const mode = isMobile ? 'mobile' : 'desktop';
    loadFromLocalStorage(mode);
    // saveToLocalStorage(mode, { rows, cols, gap, layout });
  }, [loadFromLocalStorage, isMobile]);
  
  // Load layout from local storage when rows, cols, gap, or isMobile changes
  useEffect(() => {
    const mode = isMobile ? 'mobile' : 'desktop';
    loadFromLocalStorageLayout(mode);
    // saveToLocalStorage(mode, { rows, cols, gap, layout });
  }, [rows,cols,gap, isMobile]);

  // Save the layout to local storage whenever there is a change in the layout, rows, cols, gap, or isMobile
   useEffect(() => {
     saveToLocalStorage(isMobile ? 'mobile' : 'desktop', { rows, cols, gap, layout });
   }, [layout, rows, cols, gap, saveToLocalStorage]);
 

  // Add a new item to the layout
  const addItem = useCallback((x: number, y: number) => {
    console.log('addItem', x, y);
    const currentLength = layout.length;
    const newItemKey = `${currentLength}`;

    const newItem: LayoutItem = {
      i: newItemKey,
      x: x,
      y: y,
      w: 1,
      h: 1,
    };

    const exists = layout.some(item => item.x === x && item.y === y);

    if (!exists) {
      setLayout(prevLayout => {
        const newLayout = [...prevLayout, newItem];
        saveToLocalStorage(isMobile ? 'mobile' : 'desktop', { rows, cols, gap, layout: newLayout });
        return newLayout;
      });
    } else {
      const updatedLayout = layout.map(item => {
        if (item.y >= y) {
          return { ...item, y: item.y + 1 };
        }
        return item;
      });
      setLayout([...updatedLayout, newItem]);
      saveToLocalStorage(isMobile ? 'mobile' : 'desktop', { rows, cols, gap, layout: [...updatedLayout, newItem] });
    }
  }, [layout, rows, cols, gap, saveToLocalStorage, isMobile]);

  // Delete the item from the layout
  const deleteItem = useCallback((id: string) => {
    setLayout(prevLayout => {
      const newLayout = prevLayout.filter(item => item.i !== id);
      saveToLocalStorage(isMobile ? 'mobile' : 'desktop', { rows, cols, gap, layout: newLayout });
      return newLayout;
    });
  }, [rows, cols, gap, isMobile, saveToLocalStorage]);

  // Randomize the grid layout
  const randomizeGrid = useCallback(() => {
    const maxCols = isMobile ? 3 : 5;
    const randomRows = Math.floor(Math.random() * 5) + 2;
    const randomCols = Math.floor(Math.random() * maxCols) + 2;

    const availableSpaces = Array.from({ length: randomRows }, () =>
      Array(randomCols).fill(true)
    );

    const newLayout: LayoutItem[] = [];

    const addItemToLayout = (x: number, y: number, w: number, h: number) => {
      w = Math.min(w, randomCols - x);
      h = Math.min(h, randomRows - y);

      if (x >= 0 && y >= 0 && x + w <= randomCols && y + h <= randomRows) {
        newLayout.push({ i: `${newLayout.length}`, x, y, w, h });

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

    for (let y = 0; y < randomRows; y++) {
      for (let x = 0; x < randomCols; x++) {
        if (availableSpaces[y][x]) {
          const { w, h } = getRandomSize(randomCols - x, randomRows - y);
          addItemToLayout(x, y, w, h);
        }
      }
    }

    // Check and fill any remaining gaps
    for (let y = 0; y < randomRows; y++) {
      for (let x = 0; x < randomCols; x++) {
        if (availableSpaces[y][x]) {
          addItemToLayout(x, y, 1, 1);
        }
      }
    }

    const filteredLayout = newLayout.filter(
      (item) =>
        item.x >= 0 &&
        item.y >= 0 &&
        item.x + item.w <= randomCols &&
        item.y + item.h <= randomRows
    );

    setLayout(filteredLayout);
    setRows(randomRows);
    setCols(randomCols);
    saveToLocalStorage(isMobile ? "mobile" : "desktop", {
      rows: randomRows,
      cols: randomCols,
      gap,
      layout: filteredLayout,
    });
  }, [gap, saveToLocalStorage, isMobile]);
  

  // Reset the grid to the default values for both mobile and desktop versions.
  const ResetGrid = useCallback(() => {
    const defaultData = { rows: defaultRows, cols: defaultCols, gap: defaultGap, layout: defaultLayout };
    setLayout(defaultLayout);
    setRows(defaultRows);
    setCols(defaultCols);
    setGap(defaultGap);
    setImages({});
    saveToLocalStorage('desktop', defaultData);
    saveToLocalStorage('mobile', defaultData);
  }, [saveToLocalStorage]);
  


  return {
    layout,
    addItem,
    deleteItem,
    setLayout,
    rows,
    cols,
    gap,
    isMobile,
    setIsMobile,
    setGap,
    setRows,
    setCols,
    randomizeGrid,
    ResetGrid,
    saveToLocalStorage,
    loadFromLocalStorage,
    gridStepRef,
    setImages,
    images,
    loading,
    setLoading,
  };
};

export default useGridItems;
