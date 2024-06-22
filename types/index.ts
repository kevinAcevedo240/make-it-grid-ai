
  export interface LayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
};


export interface GridContextType {
  rows: number;
  cols: number;
  layout: LayoutItem[];
  gap: number;
  addItem: (x: number, y: number) => void;
  deleteItem: (id: string) => void;
  setLayout: React.Dispatch<React.SetStateAction<LayoutItem[]>>;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  setCols: React.Dispatch<React.SetStateAction<number>>;
  setGap: React.Dispatch<React.SetStateAction<number>>;
  randomizeGrid: () => void;
  ResetGrid: () => void;
}