'use client'
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MenuGrid } from './MenuGrid';
import { Toolbar } from './Toolbar';
import { ActionBar } from './ActionBar';
import { DishEditPanel } from './DishEditPanel';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  fullDescription?: string;
  category?: string;
  allergens?: string[];
  tags?: string[];
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

export interface DecorativeItem {
  id: string;
  type: 'image' | 'logo';
  url: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1689997122000-c94449288dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMGRpc2glMjByZXN0YXVyYW50fGVufDF8fHx8MTc1Njk1NDYwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh Atlantic salmon with herbs',
    fullDescription: 'Fresh Atlantic salmon grilled to perfection with aromatic herbs and a light lemon butter sauce',
    category: 'Main Course',
    allergens: ['Fish'],
    tags: ['Healthy', 'Gluten-Free'],
    size: 'medium',
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    name: 'Truffle Pasta',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1749169337822-d875fd6f4c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBjdWlzaW5lfGVufDF8fHx8MTc1NjkzNjE4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Handmade pasta with truffle oil',
    fullDescription: 'Handmade fettuccine pasta tossed in rich truffle oil with parmesan and fresh herbs',
    category: 'Main Course',
    allergens: ['Gluten', 'Dairy'],
    tags: ['Vegetarian', 'Premium'],
    size: 'medium',
    position: { x: 1, y: 0 }
  },
  {
    id: '3',
    name: 'Gourmet Burger',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1699874372100-2c4906c4c27e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBhbWVyaWNhbiUyMGZvb2R8ZW58MXx8fHwxNzU2OTEzNDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Wagyu beef with artisan toppings',
    fullDescription: 'Premium Wagyu beef patty with caramelized onions, aged cheddar, and truffle aioli on a brioche bun',
    category: 'Main Course',
    allergens: ['Gluten', 'Dairy'],
    tags: ['Premium', 'Popular'],
    size: 'medium',
    position: { x: 2, y: 0 }
  }
];

export function MenuEditor() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [decorativeItems, setDecorativeItems] = useState<DecorativeItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const handleItemMove = useCallback((id: string, position: { x: number; y: number }) => {
    setMenuItems(items => items.map(item => 
      item.id === id ? { ...item, position } : item
    ));
  }, []);

  const handleItemSelect = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setIsEditPanelOpen(true);
  }, []);

  const handleItemUpdate = useCallback((updatedItem: MenuItem) => {
    setMenuItems(items => items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setSelectedItem(updatedItem);
  }, []);

  const handleItemDuplicate = useCallback((item: MenuItem) => {
    const newItem: MenuItem = {
      ...item,
      id: `${item.id}-${Date.now()}`,
      position: { x: item.position.x + 1, y: item.position.y }
    };
    setMenuItems(items => [...items, newItem]);
  }, []);

  const handleItemResize = useCallback((id: string, size: 'small' | 'medium' | 'large') => {
    setMenuItems(items => items.map(item => 
      item.id === id ? { ...item, size } : item
    ));
  }, []);

  const handleItemDelete = useCallback((id: string) => {
    setMenuItems(items => items.filter(item => item.id !== id));
    // Close edit panel if the deleted item was selected
    if (selectedItem?.id === id) {
      setSelectedItem(null);
      setIsEditPanelOpen(false);
    }
  }, [selectedItem]);

  const handleAddNewItem = useCallback(() => {
    const newItem: MenuItem = {
      id: `new-${Date.now()}`,
      name: 'New Dish',
      price: 0,
      image: '',
      description: '',
      size: 'medium',
      position: { x: 0, y: Math.floor(menuItems.length / 3) }
    };
    setMenuItems(items => [...items, newItem]);
    setSelectedItem(newItem);
    setIsEditPanelOpen(true);
  }, [menuItems.length]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-background">
        <ActionBar />
        
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <MenuGrid
              items={menuItems}
              decorativeItems={decorativeItems}
              onItemMove={handleItemMove}
              onItemSelect={handleItemSelect}
              onItemDuplicate={handleItemDuplicate}
              onItemResize={handleItemResize}
              onItemDelete={handleItemDelete}
            />
          </div>
          
          <Toolbar 
            onAddItem={handleAddNewItem}
            selectedItem={selectedItem}
            onItemDuplicate={selectedItem ? () => handleItemDuplicate(selectedItem) : undefined}
            onItemResize={selectedItem ? (size) => handleItemResize(selectedItem.id, size) : undefined}
          />
        </div>

        <DishEditPanel
          isOpen={isEditPanelOpen}
          onClose={() => setIsEditPanelOpen(false)}
          item={selectedItem}
          onUpdate={handleItemUpdate}
        />
      </div>
    </DndProvider>
  );
}