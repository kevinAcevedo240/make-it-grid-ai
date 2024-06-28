import { LayoutItem } from '@/types';
import { useState, useCallback, useEffect } from 'react';

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

  const saveToLocalStorage = useCallback((mode: 'desktop' | 'mobile', data: any) => {
    localStorage.setItem(`grid-${mode}`, JSON.stringify(data));
  }, []);

  const loadFromLocalStorage = useCallback((mode: 'desktop' | 'mobile') => {
    const storedData = localStorage.getItem(`grid-${mode}`);
    if (storedData) {
      const { rows, cols, gap, layout } = JSON.parse(storedData);
      setRows(rows);
      setCols(cols);
      setGap(gap);
      setLayout(layout);
    } else {
      setRows(defaultRows);
      setCols(defaultCols);
      setGap(defaultGap);
      setLayout(defaultLayout);
    }
  }, []);

  // Reset grid values to default on page load
  useEffect(() => {
    const defaultData = { rows: defaultRows, cols: defaultCols, gap: defaultGap, layout: defaultLayout };
    saveToLocalStorage('desktop', defaultData);
    saveToLocalStorage('mobile', defaultData);
    setRows(defaultRows);
    setCols(defaultCols);
    setGap(defaultGap);
    setLayout(defaultLayout);
  }, [saveToLocalStorage]);

  // Load layout from local storage when isMobile changes
  useEffect(() => {
    loadFromLocalStorage(isMobile ? 'mobile' : 'desktop');
  }, [isMobile, loadFromLocalStorage]);

  const addItem = useCallback((x: number, y: number) => {
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

  const deleteItem = useCallback((id: string) => {
    setLayout(prevLayout => {
      const newLayout = prevLayout.filter(item => item.i !== id);
      saveToLocalStorage(isMobile ? 'mobile' : 'desktop', { rows, cols, gap, layout: newLayout });
      return newLayout;
    });
  }, [rows, cols, gap, isMobile, saveToLocalStorage]);

  const randomizeGrid = useCallback(() => {
    const randomRows = Math.floor(Math.random() * 5) + 2;
    const randomCols = Math.floor(Math.random() * 5) + 2;

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

    for (let y = 0; y < randomRows; y++) {
      for (let x = 0; x < randomCols; x++) {
        if (availableSpaces[y][x]) {
          addItemToLayout(x, y, 1, 1);
        }
      }
    }

    const filteredLayout = newLayout.filter(
      item =>
        item.x >= 0 &&
        item.y >= 0 &&
        item.x + item.w <= randomCols &&
        item.y + item.h <= randomRows
    );

    setLayout(filteredLayout);
    setRows(randomRows);
    setCols(randomCols);

    saveToLocalStorage(isMobile ? 'mobile' : 'desktop', { rows: randomRows, cols: randomCols, gap, layout: filteredLayout });
  }, [gap, saveToLocalStorage, isMobile]);

  const ResetGrid = useCallback(() => {
    const defaultData = { rows: defaultRows, cols: defaultCols, gap: defaultGap, layout: defaultLayout };
    setLayout(defaultLayout);
    setRows(defaultRows);
    setCols(defaultCols);
    setGap(defaultGap);
    saveToLocalStorage('desktop', defaultData);
    saveToLocalStorage('mobile', defaultData);
  }, [saveToLocalStorage]);

  useEffect(() => {
    saveToLocalStorage(isMobile ? 'mobile' : 'desktop', { rows, cols, gap, layout });
  }, [layout, rows, cols, gap, isMobile, saveToLocalStorage]);

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
  };
};

export default useGridItems;
