'use client'
import { Button } from '../../../../components/ui/button';
import { ArrowLeft, Save, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ActionBar() {
  const router = useRouter();

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="h-6 w-px bg-border" />
        <h1 className="text-lg">Menu Editor</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Undo2 className="h-4 w-4" />
          Undo
        </Button>
        <Button size="sm" className="gap-2">
          <Save className="h-4 w-4" />
          Save Menu
        </Button>
      </div>
    </div>
  );
}