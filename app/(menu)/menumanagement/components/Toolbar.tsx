import React from 'react';
import { Button } from '../../../../components/ui/button';
import { Separator } from '../../../../components/ui/separator';
import { 
  Plus, 
  Copy, 
  Maximize2, 
  Minimize2, 
  Image, 
  Palette,
  Grid3X3
} from 'lucide-react';
import type { MenuItem } from './MenuEditor';

interface ToolbarProps {
  onAddItem: () => void;
  selectedItem?: MenuItem | null;
  onItemDuplicate?: () => void;
  onItemResize?: (size: 'small' | 'medium' | 'large') => void;
}

export function Toolbar({ 
  onAddItem, 
  selectedItem, 
  onItemDuplicate, 
  onItemResize 
}: ToolbarProps) {
  return (
    <div className="w-72 bg-card border-l border-border p-4 flex flex-col gap-4">
      <div>
        <h2 className="font-medium mb-3">Menu Tools</h2>
        
        {/* Add Items */}
        <div className="space-y-2">
          <Button 
            onClick={onAddItem}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Add New Dish
          </Button>
          
          <Button 
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Image className="h-4 w-4" />
            Add Image/Logo
          </Button>
        </div>
      </div>

      <Separator />

      {/* Selection Tools */}
      <div>
        <h3 className="font-medium mb-3">
          {selectedItem ? `Edit "${selectedItem.name}"` : 'No Item Selected'}
        </h3>
        
        <div className="space-y-2">
          <Button 
            onClick={onItemDuplicate}
            disabled={!selectedItem}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Copy className="h-4 w-4" />
            Duplicate Item
          </Button>
          
          {selectedItem && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground mb-2">Resize Item</p>
              <div className="grid grid-cols-3 gap-1">
                <Button
                  onClick={() => onItemResize?.('small')}
                  size="sm"
                  variant={selectedItem.size === 'small' ? 'default' : 'outline'}
                  className="gap-1 text-xs"
                >
                  <Minimize2 className="h-3 w-3" />
                  S
                </Button>
                <Button
                  onClick={() => onItemResize?.('medium')}
                  size="sm"
                  variant={selectedItem.size === 'medium' ? 'default' : 'outline'}
                  className="gap-1 text-xs"
                >
                  <Grid3X3 className="h-3 w-3" />
                  M
                </Button>
                <Button
                  onClick={() => onItemResize?.('large')}
                  size="sm"
                  variant={selectedItem.size === 'large' ? 'default' : 'outline'}
                  className="gap-1 text-xs"
                >
                  <Maximize2 className="h-3 w-3" />
                  L
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Layout Tools */}
      <div>
        <h3 className="font-medium mb-3">Layout</h3>
        
        <div className="space-y-2">
          <Button 
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Grid3X3 className="h-4 w-4" />
            Auto Arrange
          </Button>
          
          <Button 
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <Palette className="h-4 w-4" />
            Theme Settings
          </Button>
        </div>
      </div>

      {selectedItem && (
        <>
          <Separator />
          
          {/* Item Details */}
          <div>
            <h3 className="font-medium mb-3">Item Details</h3>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Price: </span>
                <span className="font-medium">${selectedItem.price?.toFixed(2) || '0.00'}</span>
              </div>
              
              {selectedItem.category && (
                <div>
                  <span className="text-muted-foreground">Category: </span>
                  <span>{selectedItem.category}</span>
                </div>
              )}
              
              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Tags: </span>
                  <span>{selectedItem.tags.join(', ')}</span>
                </div>
              )}
              
              <div>
                <span className="text-muted-foreground">Size: </span>
                <span className="capitalize">{selectedItem.size}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}