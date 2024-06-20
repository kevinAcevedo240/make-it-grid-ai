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

export const generateHtmlCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
  const itemPositions = layout.map(item => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` col-span-${item.w}` : '';
    const rowSpan = item.h > 1 ? ` row-span-${item.h}` : '';

    return `
    <div class="col-start-${colStart} row-start-${rowStart}${colSpan}${rowSpan}">${item.i}</div>`;
  }).join('');

  return `
  <div class="grid grid-cols-${cols} grid-rows-${rows} gap-${gap}">
    ${itemPositions}
  </div>
  `;
};

export const generateCssCode = (rows: number, cols: number, gap: number, layout: Layout[]): string => {
  const css = `
  .grid {
    display: grid;
    grid-template-columns: repeat(${cols}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    gap: ${gap}rem;
  }
  `;

  const itemPositions = layout.map(item => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` span ${item.w}` : ' span 1';
    const rowSpan = item.h > 1 ? ` span ${item.h}` : ' span 1';

    return `
    .col-start-${colStart} {
      grid-column-start: ${colStart};
    }
    .row-start-${rowStart} {
      grid-row-start: ${rowStart};
    }
    .col-span-${item.w} {
      grid-column: ${colStart} / ${colStart + item.w};
    }
    .row-span-${item.h} {
      grid-row: ${rowStart} / ${rowStart + item.h};
    }
    `;
  }).join('');

  return css + itemPositions;
};
