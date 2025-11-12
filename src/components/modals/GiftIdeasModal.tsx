import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface GiftIdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (giftIdeas: string[]) => void;
  currentGiftIdeas: string[];
}

export const GiftIdeasModal: React.FC<GiftIdeasModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentGiftIdeas,
}) => {
  const [giftIdeas, setGiftIdeas] = useState<string[]>(currentGiftIdeas);
  const [currentInput, setCurrentInput] = useState('');

  const handleAddGift = () => {
    if (currentInput.trim()) {
      setGiftIdeas([...giftIdeas, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleRemoveGift = (index: number) => {
    setGiftIdeas(giftIdeas.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(giftIdeas);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gift Theme Ideas</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Enter gift idea..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddGift()}
              className="flex-1"
            />
            <Button
              onClick={handleAddGift}
              size="icon"
              className="bg-emerald-400 hover:bg-emerald-500"
            >
              <Plus size={20} />
            </Button>
          </div>

          {giftIdeas.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {giftIdeas.map((gift, index) => (
                <div
                  key={index}
                  className="bg-emerald-100 rounded-xl p-3 flex justify-between items-center"
                >
                  <span className="text-gray-900">{gift}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveGift(index)}
                    className="h-8 w-8 hover:bg-emerald-200"
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No gift ideas added yet</p>
            </div>
          )}

          <Button onClick={handleSave} className="w-full">
            Save Gift Ideas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
