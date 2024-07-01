
import { LayoutItem } from '@/types';

const loadFromLocalStorage = (mode: 'desktop' | 'mobile') => {
  const storedData = localStorage.getItem(`grid-${mode}`);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

const generateTailwindCode = () => {
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

const generateHtmlCode = (): string => {
  const mobileData = loadFromLocalStorage('mobile');
  const desktopData = loadFromLocalStorage('desktop');

  if (!mobileData || !desktopData) {
    return ''; // If any data is missing, return an empty string
  }

  const mobileLayout = mobileData.layout;
  const desktopLayout = desktopData.layout;

  const combinedItems = [
    ...mobileLayout.map((mobileItem: LayoutItem) => {
      const desktopItem = desktopLayout.find((item: LayoutItem) => item.i === mobileItem.i);
      return desktopItem ? `<div class="item item-${mobileItem.i}">${mobileItem.i}</div>
      ` : `<div class="item item-${mobileItem.i} mobile-only">${mobileItem.i}</div>
      `;
    }),
    ...desktopLayout.filter((desktopItem: LayoutItem) => !mobileLayout.find((item: LayoutItem) => item.i === desktopItem.i)).map((desktopItem: LayoutItem) => {
      return `<div class="item item-${desktopItem.i} desktop-only">${desktopItem.i}</div>
      `;
    })
  ].join('');

  return `
  <div class="grid">
    ${combinedItems}
  </div>
  `;
};

const generateCssCode = (): string => {
  const mobileData = loadFromLocalStorage('mobile');
  const desktopData = loadFromLocalStorage('desktop');

  if (!mobileData || !desktopData) {
    return ''; // If any data is missing, return an empty string
  }

  const mobileLayout = mobileData.layout;
  const desktopLayout = desktopData.layout;
  
  const baseStyles = `
  .grid {
    display: grid;
    grid-template-columns: repeat(${mobileData.cols}, 1fr);
    grid-template-rows: repeat(${mobileData.rows}, 1fr);
    gap: ${mobileData.gap * 4}px;
  }
  .item {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
  }
  .mobile-only {
    display: block;
  }
  .desktop-only {
    display: none;
  }
  `;

  const itemsMobile = mobileLayout.map((item: LayoutItem) => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` / span ${item.w}` : '';
    const rowSpan = item.h > 1 ? ` / span ${item.h}` : '';

    return `
    .item-${item.i} {
      grid-column: ${colStart}${colSpan};
      grid-row: ${rowStart}${rowSpan};
    }
    `;
  }).join('');

  const itemsDesktop = desktopLayout.map((item: LayoutItem) => {
    const colStart = item.x + 1;
    const rowStart = item.y + 1;
    const colSpan = item.w > 1 ? ` / span ${item.w}` : '';
    const rowSpan = item.h > 1 ? ` / span ${item.h}` : '';

    return `
    .item-${item.i} {
      grid-column: ${colStart}${colSpan};
      grid-row: ${rowStart}${rowSpan};
    }
    `;
  }).join('');

  const mediaQueryDesktop = `@media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(${desktopData.cols}, 1fr);
      grid-template-rows: repeat(${desktopData.rows}, 1fr);
      gap: ${desktopData.gap * 4}px;
    }
    .mobile-only {
      display: none;
    }
    .desktop-only {
      display: block;
    }
    ${itemsDesktop}
  }`;

  return baseStyles + itemsMobile + mediaQueryDesktop;
};

const useGridCodeGenerator = () => {
  const tailwindCode = generateTailwindCode();
  const htmlCode = generateHtmlCode();
  const cssCode = generateCssCode();

  return { tailwindCode, htmlCode, cssCode };
};

export default useGridCodeGenerator;
