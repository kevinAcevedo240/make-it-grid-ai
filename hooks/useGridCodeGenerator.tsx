import { Layout } from 'react-grid-layout';
import { useContext } from 'react';
import { GridContext } from '@/context/useGridContext';
import { LayoutItem } from '@/types';

const loadFromLocalStorage = (mode: 'desktop' | 'mobile') => {
  const storedData = localStorage.getItem(`grid-${mode}`);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

const generateTailwindCode = (rows: number, cols: number, gap: number, layout: Layout[], isMobile: boolean): string => {
  const mobileData = loadFromLocalStorage('mobile');
  const desktopData = loadFromLocalStorage('desktop');

  if (!mobileData || !desktopData) {
    return ''; // If any data is missing, return an empty string
  }

  const mobileLayout = mobileData.layout;
  const desktopLayout = desktopData.layout;

  const generateItemClasses = (mobileItem: LayoutItem | null, desktopItem: LayoutItem | null) => {
    let classes = '';

    if (mobileItem) {
      const mobileColStart = `col-start-${mobileItem.x + 1}`;
      const mobileRowStart = ` row-start-${mobileItem.y + 1}`;
      const mobileColSpan = mobileItem.w > 1 ? ` col-span-${mobileItem.w}` : '';
      const mobileRowSpan = mobileItem.h > 1 ? ` row-span-${mobileItem.h}` : '';

      classes += `${mobileColStart}${mobileRowStart}${mobileColSpan}${mobileRowSpan}`;
    } else {
      classes += 'hidden md:block';
    }

    if (desktopItem) {
      const desktopColStart = ` md:col-start-${desktopItem.x + 1}`;
      const desktopRowStart = ` md:row-start-${desktopItem.y + 1}`;
      const desktopColSpan = desktopItem.w >= 1 ? ` md:col-span-${desktopItem.w}` : '';
      const desktopRowSpan = desktopItem.h >= 1 ? ` md:row-span-${desktopItem.h}` : '';

      classes += `${desktopColStart}${desktopRowStart}${desktopColSpan}${desktopRowSpan}`;
    } else {
      classes += ' md:hidden';
    }

    return classes;
  };

  const combinedItems = [
    ...mobileLayout.map((mobileItem: LayoutItem) => {
      const desktopItem = desktopLayout.find((item: LayoutItem) => item.i === mobileItem.i) || null;
      return `<div class="${generateItemClasses(mobileItem, desktopItem)} bg-gray-300 rounded-md p-10">${mobileItem.i}</div>
      `;
    }),
    ...desktopLayout.filter((desktopItem: LayoutItem) => !mobileLayout.find((item: LayoutItem) => item.i === desktopItem.i)).map((desktopItem: LayoutItem) => {
      return `<div class="${generateItemClasses(null, desktopItem)} bg-gray-300 rounded-md p-10">${desktopItem.i}</div>
      `;
    })
  ].join('');

  const gridCols = `grid-cols-${mobileData.cols} md:grid-cols-${desktopData.cols}`;
  const gridRows = `grid-rows-${mobileData.rows} md:grid-rows-${desktopData.rows}`;
  const finalGap = `gap-${mobileData.gap} md:gap-${desktopData.gap}`;

  return `
    <div class="grid ${gridCols} ${gridRows} ${finalGap} m-4">
      ${combinedItems}
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
