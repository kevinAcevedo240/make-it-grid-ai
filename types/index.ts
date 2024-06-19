export interface ItemGrid {
    id: string;
    position?: string; // Hacemos opcional la posición porque no la estamos usando directamente
    x: number;
    y: number;
    w: number;
    h: number;
  }

export interface Item {
    id: string;
    position: string;
    size: { width: number; height: number };
  }