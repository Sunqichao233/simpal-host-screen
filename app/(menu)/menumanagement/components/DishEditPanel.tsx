import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../../../components/ui/sheet';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { Label } from '../../../../components/ui/label';
import { Badge } from '../../../../components/ui/badge';
import { Separator } from '../../../../components/ui/separator';
import { X, Plus, Save, Upload } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback'; // 暂时注释掉，因为该组件不存在
import type { MenuItem } from './MenuEditor';

interface DishEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onUpdate: (item: MenuItem) => void;
}

export function DishEditPanel({ isOpen, onClose, item, onUpdate }: DishEditPanelProps) {
  const [formData, setFormData] = useState<Partial<MenuItem>>({});
  const [newTag, setNewTag] = useState('');
  const [newAllergen, setNewAllergen] = useState('');

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleSave = () => {
    if (item && formData) {
      onUpdate({
        ...item,
        ...formData,
        price: Number(formData.price) || 0,
      } as MenuItem);
      onClose();
    }
  };

  const handleCancel = () => {
    if (item) {
      setFormData(item);
    }
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && formData.tags) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter(tag => tag !== tagToRemove)
    });
  };

  const addAllergen = () => {
    if (newAllergen.trim()) {
      setFormData({
        ...formData,
        allergens: [...(formData.allergens || []), newAllergen.trim()]
      });
      setNewAllergen('');
    }
  };

  const removeAllergen = (allergenToRemove: string) => {
    setFormData({
      ...formData,
      allergens: (formData.allergens || []).filter(allergen => allergen !== allergenToRemove)
    });
  };

  if (!item) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[500px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Edit Dish Details</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto px-6 space-y-6">
          {/* Image Section */}
          <div>
            <Label>Dish Image</Label>
            <div className="mt-2">
              <div className="w-full h-40 bg-muted rounded-lg overflow-hidden border-2 border-dashed border-border hover:border-border/60 transition-colors cursor-pointer">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || 'Dish image'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-sm">Click to upload image</span>
                  </div>
                )}
              </div>
              <Input
                placeholder="Or paste image URL"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Dish Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter dish name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Main Course, Appetizer, Dessert"
                className="mt-1"
              />
            </div>
          </div>

          <Separator />

          {/* Descriptions */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description for the menu card"
                className="mt-1 min-h-[60px]"
              />
            </div>

            <div>
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription || ''}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="Detailed description with ingredients and preparation"
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="mt-2 space-y-2">
              <div className="flex flex-wrap gap-2">
                {(formData.tags || []).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag (e.g., Vegetarian, Spicy)"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Allergens */}
          <div>
            <Label>Allergens</Label>
            <div className="mt-2 space-y-2">
              <div className="flex flex-wrap gap-2">
                {(formData.allergens || []).map((allergen, index) => (
                  <Badge key={index} variant="destructive" className="gap-1">
                    {allergen}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive-foreground/70" 
                      onClick={() => removeAllergen(allergen)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newAllergen}
                  onChange={(e) => setNewAllergen(e.target.value)}
                  placeholder="Add allergen (e.g., Nuts, Dairy)"
                  onKeyPress={(e) => e.key === 'Enter' && addAllergen()}
                />
                <Button onClick={addAllergen} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-4 border-t border-border">
          <div className="flex gap-2 justify-end">
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}