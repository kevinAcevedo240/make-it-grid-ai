import React, { useContext } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GridContext } from '@/context/useGridContext';
import * as Icons from "@/components/icons/icons";

const GridSettings: React.FC = () => {
  const { rows, cols, gap, setRows, setCols, setGap } = useContext(GridContext);

  const incrementValue = (setter: { (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (arg0: any): void; }, value: number) => {
    if (value < 12) {
      setter(value + 1);
    }
  };

  const decrementValue = (setter: { (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (arg0: number): void; }, value: number) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  return (
    <div className="mb-6 flex justify-center items-center space-x-4 z-10">
      <div className="input-step flex gap-4">
        <div className="w-16 sm:w-24 flex flex-col justify-center items-center z-10">
          <Label htmlFor="rows" className="block mb-2 md:text-lg">
            Rows
          </Label>
          <div className="relative flex flex-col items-center">
            <Input
              id="rows"
              type="number"
              min={0}
              max={12}
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value, 10))}
              className="p-1 border text-center text-lg md:pr-0 pr-4"
            />
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col md:hidden">
              <button
                type="button"
                onClick={() => incrementValue(setRows, rows)}
                className=""
              >
                <Icons.ChevronUpIcon className='size-4 text-muted-foreground'/>
              </button>
              <button
                type="button"
                onClick={() => decrementValue(setRows, rows)}
                className=""
              >
                <Icons.ChevronDownIcon className='size-4 text-muted-foreground'/>
              </button>
            </div>
          </div>
        </div>
        <div className="w-16 sm:w-24 flex flex-col justify-center items-center z-10">
          <Label htmlFor="cols" className="block mb-2 md:text-lg">
            Columns
          </Label>
          <div className="relative flex flex-col items-center">
            <Input
              id="cols"
              type="number"
              min={0}
              max={12}
              value={cols}
              onChange={(e) => setCols(parseInt(e.target.value, 10))}
              className="p-1 border text-center text-lg md:pr-0 pr-4"
            />
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col md:hidden">
              <button
                type="button"
                onClick={() => incrementValue(setCols, cols)}
                className=""
              >
                <Icons.ChevronUpIcon className='size-4 text-muted-foreground'/>
              </button>
              <button
                type="button"
                onClick={() => decrementValue(setCols, cols)}
                className=""
              >
                <Icons.ChevronDownIcon className='size-4 text-muted-foreground'/>
              </button>
            </div>
          </div>
        </div>
        <div className="w-16 sm:w-24 flex flex-col justify-center items-center z-10">
          <Label htmlFor="gap" className="block mb-2 md:text-lg">
            Gap
          </Label>
          <div className="relative flex flex-col items-center">
            <Input
              id="gap"
              type="number"
              min={0}
              max={12}
              value={gap}
              onChange={(e) => setGap(parseInt(e.target.value, 10))}
              className="p-1 border text-center text-lg md:pr-0 pr-4"
            />
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col md:hidden">
              <button
                type="button"
                onClick={() => incrementValue(setGap, gap)}
                className=""
              >
                <Icons.ChevronUpIcon className='size-4 text-muted-foreground'/>
              </button>
              <button
                type="button"
                onClick={() => decrementValue(setGap, gap)}
                className=""
              >
                <Icons.ChevronDownIcon className='size-4 text-muted-foreground'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSettings;
