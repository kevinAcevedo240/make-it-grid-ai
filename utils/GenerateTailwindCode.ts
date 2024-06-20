import { Layout } from 'react-grid-layout';

export const generateTailwindCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
  const itemPositions = layout.map(item => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` col-span-${item.w}` : '';
    const rowSpan = item.h > 1 ? ` row-span-${item.h}` : '';

    return `
    <div className="col-start-${colStart} row-start-${rowStart}${colSpan}${rowSpan}">${item.i}</div>`;
  }).join('');

  return `
  <div className="grid grid-cols-${cols} grid-rows-${rows} gap-${gap}">
    ${itemPositions}
  </div>
  `;
};
