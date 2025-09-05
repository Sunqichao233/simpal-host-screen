import React from 'react';
import { useDrag } from 'react-dnd';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { X } from 'lucide-react';
import type { MenuItem } from './MenuEditor';

interface MenuCardProps {
  item: MenuItem;
  onSelect: () => void;
  onDuplicate: () => void;
  onResize: (size: 'small' | 'medium' | 'large') => void;
  onDelete: () => void;
}

export function MenuCard({ item, onSelect, onDuplicate, onResize, onDelete }: MenuCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'menu-item',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const sizeClasses = {
    small: 'w-48 h-56',
    medium: 'w-56 h-64',
    large: 'w-64 h-72'
  };

  const imageSizeClasses = {
    small: 'h-32',
    medium: 'h-36',
    large: 'h-40'
  };

  return (
    <Card
      className={`${sizeClasses[item.size]} cursor-move bg-card border shadow-sm hover:shadow-md transition-all duration-200 group relative ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      }`}
      onClick={onSelect}
    >
      <div ref={drag as any} className="h-full w-full">
      {/* Delete Button */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="destructive"
          size="sm"
          className="h-8 w-8 p-0 bg-destructive/90 hover:bg-destructive shadow-md"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Card Content */}
      <div className="p-0 h-full flex flex-col">
        {/* Image */}
        <div className={`${imageSizeClasses[item.size]} relative overflow-hidden rounded-t-lg bg-muted`}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-foreground mb-1 leading-tight">
              {item.name || 'Untitled Dish'}
            </h3>
            <p className="text-muted-foreground text-sm mb-2 leading-tight">
              {item.description || 'No description'}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">
              ${item.price?.toFixed(2) || '0.00'}
            </span>
            {item.category && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {item.category}
              </span>
            )}
          </div>
        </div>
      </div>
      </div>
    </Card>
  );
}