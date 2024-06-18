interface Item {
  id: string;
  position: string;
  size: { width: number; height: number };
}

export const generateTailwindCode = (rows: number, cols: number, gap: number, items: Item[]): string => {
  const itemPositions = items.map(item => {
    const [row, col] = item.position.split('-').map(Number);
    return `
    <div class="row-start-${row + 1} col-start-${col + 1}" style="width: ${item.size.width}px; height: ${item.size.height}px;">${item.id}</div>`;
  }).join('');

  return `
  <div class="grid grid-cols-${cols} grid-rows-${rows} gap-${gap}">
    ${itemPositions}
  </div>
  `;
};
