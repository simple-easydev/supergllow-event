import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Theme } from '../../lib/supabase';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (theme: Theme) => void;
  currentTheme: Theme | null;
}

const themes: Theme[] = [
  { id: 'superhero', name: 'Superhero', icon: '🦸', bgColor: 'bg-gradient-to-br from-pink-500 to-purple-600' },
  { id: 'birthday', name: 'Birthday', icon: '🎂', bgColor: 'bg-gradient-to-br from-blue-200 to-blue-400' },
  { id: 'fairy', name: 'Fairy', icon: '✨', bgColor: 'bg-gradient-to-br from-pink-200 to-purple-300' },
  { id: 'pamper', name: 'Pamper', icon: '💅', bgColor: 'bg-gradient-to-br from-red-400 to-pink-500' },
  { id: 'disco', name: 'Disco', icon: '🎵', bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600' },
  { id: 'sports', name: 'Sports', icon: '⚽', bgColor: 'bg-gradient-to-br from-green-500 to-blue-600' },
];

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentTheme,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelect(theme)}
              className={`border-2 rounded-2xl p-4 text-center transition-all ${
                currentTheme?.id === theme.id
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className={`${theme.bgColor} w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl`}
              >
                {theme.icon}
              </div>
              <p className="text-sm font-medium text-gray-900">{theme.name}</p>
            </button>
          ))}
        </div>

        <Button
          variant="secondary"
          onClick={onClose}
          className="w-full"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};
