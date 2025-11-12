import React from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon, XIcon } from '@/components/icons';

interface Guest {
  id: string;
  name: string;
  initials: string;
}

interface GuestListModalProps {
  open: boolean;
  onClose: () => void;
  guests: Guest[];
  onSelectGuest: (guestId: string) => void;
  onAddDetails: () => void;
}

export const GuestListModal: React.FC<GuestListModalProps> = ({
  open,
  onClose,
  guests,
  onSelectGuest,
  onAddDetails,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="!fixed !bottom-0 !top-auto !left-0 !right-0 !translate-x-0 !translate-y-0 w-full max-w-full p-0 m-0 bg-white rounded-t-3xl rounded-b-none border-none !duration-300 data-[state=open]:!animate-none data-[state=closed]:!animate-none data-[state=open]:!slide-in-from-bottom data-[state=closed]:!slide-out-to-bottom !inset-x-0"
        style={{ 
          top: 'auto',
          left: '0',
          right: '0',
          bottom: '0',
          transform: 'none',
          animation: open ? 'slideUpFromBottom 0.3s ease-out' : 'slideDownToBottom 0.3s ease-out'
        }}
      >
        <div className="flex flex-col gap-6 p-6 max-h-[80vh]">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-blue-950 text-3xl font-semibold font-heading leading-9">
              Guest List
            </h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <XIcon />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-slate-500 text-base font-normal leading-6">
            Select who you are RSVPing for
          </p>

          {/* Guest List with ScrollArea */}
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-3">
              {guests.map((guest) => (
                <button
                  key={guest.id}
                  onClick={() => onSelectGuest(guest.id)}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-950/20 hover:bg-slate-50 transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-950 text-base font-bold">
                      {guest.initials}
                    </span>
                  </div>
                  <span className="text-blue-950 text-lg font-medium">
                    {guest.name}
                  </span>
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Add My Details Button */}
          <div className="flex justify-between items-center pt-4">
            <span className="text-slate-500 text-base font-normal">
              Add My Details
            </span>
            <button
              onClick={onAddDetails}
              className="w-14 h-14 bg-blue-950 rounded-full flex items-center justify-center hover:bg-blue-950/90 transition-colors"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
