
'use client'

import React, { useState, useRef } from 'react';
import Grid from '../components/Grid';
import GridSettings from '../components/GridSettings';
import { generateTailwindCode } from '../utils/GenerateTailwindCode';
import { Button } from "@/components/ui/button"
import { Label } from './ui/label';
import { CopyIcon } from "@radix-ui/react-icons"
import toast from 'react-hot-toast';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Item {
  id: string;
  position: string;
  size: { width: number; height: number };
}

const GridEditor = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const codeContainerRef = useRef<HTMLPreElement>(null);

  const handleDrop = (id: string, position: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, position } : item
      )
    );
  };

  const handleResize = (id: string, size: { width: number; height: number }) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, size } : item
      )
    );
  };

  const handleAddItem = (position: string) => {
    const newItem: Item = {
      id: String(items.length + 1),
      position,
      size: { width: 100, height: 100 },
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const handleResetGrid = () => {
    setItems([]);
  };

  const handleCopyToClipboard = () => {
    if (codeContainerRef.current) {
      const codeToCopy = codeContainerRef.current.innerText.trim();
      navigator.clipboard.writeText(codeToCopy)
        .then(() => toast.success('Code Copied to Clipboard!'))
        .catch((err) => console.error('Failed to copy:', err));
    }
  };

  return (
    <div className="p-4">
      <GridSettings
        rows={rows}
        cols={cols}
        gap={gap}
        setRows={setRows}
        setCols={setCols}
        setGap={setGap}
      />
      <div className="flex my-6 gap-4">
        <Button onClick={handleResetGrid} className="p-2 border-primary border dark:bg-primary/0">
          Reset Grid
        </Button>
      </div>

      <div className=' overflow-x-auto'>
        <Grid
          rows={rows}
          cols={cols}
          gap={gap}
          items={items}
          onDrop={handleDrop}
          onResize={handleResize}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <h2 className='text-xl sm:text-2xl'>Generated Tailwind Code</h2>
              <Button onClick={handleCopyToClipboard} className="p-2">
                <CopyIcon className='size-4'/>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Your Code:</Label>
              <pre
                ref={codeContainerRef}
                className="border rounded-lg p-2 overflow-x-auto"
              >
                {generateTailwindCode(rows, cols, gap, items)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      
      
    </div>
  );
};

export default GridEditor;
