import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { Button } from './ui/button';

const ComplexInterfaceGrid = () => {
  const [layout, setLayout] = useState([
    { i: 'widget1', x: 0, y: 0, w: 2, h: 4 },
    // More widgets...
  ]);

  const addWidget = () => {
    const newWidget = { i: `widget${layout.length + 1}`, x: 0, y: Infinity, w: 2, h: 4 };
    setLayout([...layout, newWidget]);
  };

  // Function to remove a widget...
  // Function to update a widget...

  return (
    <div>
      <Button onClick={addWidget} className="h-16 w-24 bg-primary mb-6">
        Add Widget
      </Button>
      <GridLayout
        className="complex-interface-layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => (
          <div key={item.i} style={{ background: "#009688" }}>
            {`Widget ${item.i}`}
          </div>
        ))}
      </GridLayout>
    </div>
  );
   
    
};

export default ComplexInterfaceGrid;