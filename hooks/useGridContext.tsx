'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import useGridItems from './useGridItems';
import { GridContextType } from '@/types';

interface GridProviderProps {
  children: ReactNode;
}

export const GridContext = createContext<GridContextType>({
  rows: 0,
  cols: 0,
  layout: [],
  gap: 0,
  addItem: () => {},
  deleteItem: () => {},
  setLayout: () => {},
  setRows: () => {},
  setCols: () => {},
  setGap: () => {},
  randomizeGrid: () => {},
  ResetGrid: () => {},
  
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