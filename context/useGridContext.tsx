'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useGridItems from '@/hooks/useGridItems';
import { GridContextType, LayoutItem } from '@/types'; // Import the LayoutItem type

interface GridProviderProps {
  children: ReactNode;
}

export const GridContext = createContext<GridContextType>({
  rows: 0,
  cols: 0,
  layout: [],
  gap: 0,
  isMobile: false,
  addItem: () => {},
  deleteItem: () => {},
  setLayout: () => {},
  setRows: () => {},
  setCols: () => {},
  setGap: () => {},
  randomizeGrid: () => {},
  ResetGrid: () => {},
  setIsMobile: () => {},
  saveToLocalStorage: () => {},
  loadFromLocalStorage: (mode: 'desktop' | 'mobile') => ({
      rows: 0, // Correct the type of 'rows' to be a number
      cols: 0, // Correct the type of 'cols' to be a number
      layout: [], // Correct the type of 'layout' to be an array of LayoutItem
      gap: 0, // Correct the type of 'gap' to be a number
  }),
});

export const GridProvider = ({ children }: GridProviderProps) => {
  const gridItems = useGridItems();

  return (
    <GridContext.Provider value={gridItems}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error('useGridItemsContext must be used within a GridItemsProvider');
  }
  return context;
};
