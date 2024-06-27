import { Layout } from 'react-grid-layout';
import { useContext } from 'react';
import { GridContext } from '@/hooks/useGridContext';

const generateTailwindCode = (rows: number, cols: number, gap: number, layout: Layout[], isMobile: boolean): string => {
  const itemPositions = layout.map(item => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` col-span-${item.w}` : '';
    const rowSpan = item.h > 1 ? ` row-span-${item.h}` : '';

    return `
        <div class="col-start-${colStart} row-start-${rowStart}${colSpan}${rowSpan} bg-gray-300 rounded-md p-2">${item.i}</div>`;
  }).join('');

  const gridCols = `grid-cols-${cols}`;
  const gridRows = `grid-rows-${rows}`;

  return `
    <div class="grid ${gridCols} ${gridRows} gap-${gap} m-4">
      ${itemPositions}
    </div>
  `;
};

const generateHtmlCode = (layout: Layout[]): string => {
  const itemPositions = layout.map((item, index) => 
  `<div class="item item-${index + 1}">${item.i}</div>
  `).join('  ');

  return `
  <div class="grid">
    ${itemPositions}
  </div>
  `;
};

const generateCssCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
  const baseStyles = `
  .grid {
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: ${gap * 4}px;
  }
  .item {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
  }
  `;

  const itemStyles = layout.map((item, index) => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` / span ${item.w}` : '';
    const rowSpan = item.h > 1 ? ` / span ${item.h}` : '';

    return `
    .item-${index + 1} {
      grid-column: ${colStart}${colSpan};
      grid-row: ${rowStart}${rowSpan};
    }
    `;
  }).join('');

  return baseStyles + itemStyles;
};

const generateFlexboxCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
  const baseStyles = `
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: ${gap * 4}px;
    margin: 1rem;
    height: calc(100vh - 2rem); /* Adjust height as necessary */
  }
  .item {
    background-color: #d1d5db;
    border-radius: 0.375rem;
    padding: 0.5rem;
    text-align: center;
    box-sizing: border-box;
  }
  `;

  const itemStyles = layout.map((item, index) => {
    const width = (item.w / cols) * 100;
    const height = (item.h / rows) * 100;

    return `
    .item-${index + 1} {
      flex: 0 0 calc(${width}% - ${gap * 4}px);
      height: calc(${height}% - ${gap * 4}px);
    }
    `;
  }).join('');

  return baseStyles + itemStyles;
};

const generateHtmlFlexboxCode = (layout: Layout[]): string => {
  const itemPositions = layout.map((item, index) => 
  `<div class="item item-${index + 1}">${item.i}</div>
  `).join('  ');

  return `
  <div class="container">
    ${itemPositions}
  </div>
  `;
};

const useGridCodeGenerator = (rows: number, cols: number, gap: number, layout: Layout[]) => {
  const { isMobile } = useContext(GridContext);

  const tailwindCode = generateTailwindCode(rows, cols, gap, layout, isMobile);
  const htmlCode = generateHtmlCode(layout);
  const cssCode = generateCssCode(rows, cols, gap, layout);
  const flexboxCode = generateFlexboxCode(rows, cols, gap, layout);
  const htmlFlexboxCode = generateHtmlFlexboxCode(layout);

  return { tailwindCode, htmlCode, cssCode, flexboxCode, htmlFlexboxCode };
};

export default useGridCodeGenerator;
