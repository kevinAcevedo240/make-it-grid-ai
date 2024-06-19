import { Item } from "@/types";


export const generateTailwindCode = (rows: number, cols: number, gap: number, items: Item[]): string => {
  const itemPositions = items.map(item => {
    const [row, col] = item.position.split('-').map(Number);
    return `
    <div className="row-start-${row + 1} col-start-${col + 1}">${item.id}</div>`;
  }).join('');

  return `
  <div className="grid grid-cols-${cols} grid-rows-${rows} gap-${gap}">
    ${itemPositions}
  </div>
  `;
};
