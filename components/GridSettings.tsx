import React, { useContext } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GridContext } from '@/context/useGridContext';

const GridSettings: React.FC = () => {
  const { rows, cols, gap, setRows, setCols, setGap } = useContext(GridContext);

  return (
    <div className=" mb-6 flex justify-center items-center space-x-4 z-10">
      <div className='input-step flex gap-4'>
        <div className="w-16 sm:w-24 flex flex-col justify-center items-center z-10">
          <Label htmlFor="rows" className="block mb-2 md:text-lg">
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
        <div className="w-16 sm:w-24 flex flex-col justify-center items-center z-10">
          <Label htmlFor="cols" className="block mb-2 md:text-lg">
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
        <div className="w-16 sm:w-24 flex flex-col justify-center items-center z-10">
          <Label htmlFor="gap" className="block mb-2 md:text-lg">
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
    </div>
  );
};

export default GridSettings;
