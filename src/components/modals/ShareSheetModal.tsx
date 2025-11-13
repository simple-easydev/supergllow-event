import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ShareSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
}

export const ShareSheetModal: React.FC<ShareSheetModalProps> = ({ isOpen, onClose, onShare }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleShareAction = () => {
    handleClose();
    setTimeout(() => {
      onShare();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative w-full max-w-md mx-4 mb-4 bg-white rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 size-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <X size={20} className="text-gray-700" />
        </button>

        <div className="relative">
          <img
            src="/Activity View - iPhone.png"
            alt="iOS Share Sheet"
            className="w-full h-auto"
          />

          <button
            onClick={handleShareAction}
            className="absolute bottom-[210px] left-[16%] w-[18%] h-[90px] bg-transparent hover:bg-white/10 transition-colors"
            aria-label="AirDrop"
          />

          <button
            onClick={handleShareAction}
            className="absolute bottom-[210px] left-[38%] w-[18%] h-[90px] bg-transparent hover:bg-white/10 transition-colors"
            aria-label="Messages"
          />
        </div>
      </div>
    </div>
  );
};
