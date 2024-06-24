import { Layout } from 'react-grid-layout';

export const generateTailwindCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
  const itemPositions = layout.map(item => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` col-span-${item.w}` : '';
    const rowSpan = item.h > 1 ? ` row-span-${item.h}` : '';

    return `
    <div class="col-start-${colStart} row-start-${rowStart}${colSpan}${rowSpan} bg-gray-300 rounded-md p-2">${item.i}</div>`;
  }).join('');

  return `
  <div class="grid grid-cols-${cols} grid-rows-${rows} gap-${gap} m-4">
    ${itemPositions}
  </div>
  `;
};

export const generateHtmlCode = ( layout: Layout[]): string => {
  const itemPositions = layout.map((item, index) => 
  `<div class="item item-${index + 1}">${item.i}</div>
  `).join('  ');

  return `
  <div class="grid">

    ${itemPositions}
  </div>
  `;
};

export const generateCssCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
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


export const generateFlexboxCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
  const baseStyles = `
  .grid {
    display: flex;
    flex-wrap: wrap;
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
    const width = (item.w / cols) * 100;
    const height = (item.h / rows) * 100;

    return `
    .item-${index + 1} {
      flex: 0 0 ${width}%;
      height: calc(${height}% - ${gap * 4}px);
    }
    `;
  }).join('');

  return baseStyles + itemStyles;
};
