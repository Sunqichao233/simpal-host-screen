import React from 'react';
import { useDrop } from 'react-dnd';
import { MenuCard } from './MenuCard';
import type { MenuItem, DecorativeItem } from './MenuEditor';

interface MenuGridProps {
  items: MenuItem[];
  decorativeItems: DecorativeItem[];
  onItemMove: (id: string, position: { x: number; y: number }) => void;
  onItemSelect: (item: MenuItem) => void;
  onItemDuplicate: (item: MenuItem) => void;
  onItemResize: (id: string, size: 'small' | 'medium' | 'large') => void;
  onItemDelete: (id: string) => void;
}

export function MenuGrid({
  items,
  decorativeItems,
  onItemMove,
  onItemSelect,
  onItemDuplicate,
  onItemResize,
  onItemDelete
}: MenuGridProps) {
  const [, drop] = useDrop({
    accept: 'menu-item',
    drop: (draggedItem: { id: string }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;

      const gridSize = 220; // Approximate card width + gap
      const newX = Math.max(0, Math.round(delta.x / gridSize));
      const newY = Math.max(0, Math.round(delta.y / gridSize));
      
      onItemMove(draggedItem.id, { x: newX, y: newY });
    }
  });

  // Calculate grid dimensions based on items
  const maxX = Math.max(...items.map(item => item.position.x), 2);
  const maxY = Math.max(...items.map(item => item.position.y), 2);
  const gridCols = Math.max(maxX + 1, 3);
  const gridRows = Math.max(maxY + 1, 3);

  // Create grid array for positioning
  const gridArray = Array(gridRows).fill(null).map(() => Array(gridCols).fill(null));
  
  // Place items in grid
  items.forEach(item => {
    if (item.position.y < gridRows && item.position.x < gridCols) {
      gridArray[item.position.y][item.position.x] = item;
    }
  });

  return (
    <div 
      ref={drop as any}
      className="flex-1 p-6 overflow-auto bg-muted/20"
      style={{ minHeight: '100%' }}
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className="grid gap-6 auto-rows-max"
          style={{ 
            gridTemplateColumns: `repeat(${gridCols}, minmax(200px, 1fr))`,
            minHeight: `${gridRows * 280}px`
          }}
        >
          {gridArray.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative min-h-[260px] flex items-center justify-center"
              >
                {item ? (
                  <MenuCard
                    item={item}
                    onSelect={() => onItemSelect(item)}
                    onDuplicate={() => onItemDuplicate(item)}
                    onResize={(size) => onItemResize(item.id, size)}
                    onDelete={() => onItemDelete(item.id)}
                  />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-border/40 rounded-lg flex items-center justify-center text-muted-foreground hover:border-border/60 transition-colors">
                    <span className="text-sm">Drop item here</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}