import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface GridSettingsProps {
  rows: number;
  cols: number;
  gap: number;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  setGap: (gap: number) => void;
}

const GridSettings: React.FC<GridSettingsProps> = ({ rows, cols, gap, setRows, setCols, setGap }) => {
  return (
    <div className="mb-4 flex justify-center items-center space-x-4">
    <div className='w-16 sm:w-24 flex flex-col justify-center items-center'>
      <Label htmlFor="rows" className="block mb-2 ">
        Rows
      </Label>
      <Input
        id="rows"
        type="number"
        min={0}
        max={12}
        value={rows}
        onChange={(e) => setRows(parseInt(e.target.value, 10))}
        className="p-1 border text-center text-lg"
      />
    </div>
    <div className='w-16 sm:w-24 flex flex-col justify-center items-center'>
      <Label htmlFor="cols" className="block mb-2 ">
        Columns
      </Label>
      <Input
        id="cols"
        type="number"
        min={0}
        max={12}
        value={cols}
        onChange={(e) => setCols(parseInt(e.target.value, 10))}
        className="p-1 border text-center text-lg"
      />
    </div>
    <div className='w-16 sm:w-24 flex flex-col justify-center items-center'>
      <Label htmlFor="gap" className="block mb-2">
        Gap
      </Label>
      <Input
        id="gap"
        type="number"
        min={0}
        max={12}
        value={gap}
        onChange={(e) => setGap(parseInt(e.target.value, 10))}
        className="p-1 border text-center text-lg"
      />
    </div>
  </div>
  );
};

export default GridSettings;
