import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

interface Guest {
  name: string;
  type: 'adult' | 'child';
  dietary?: string;
}

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guests: Guest[]) => void;
  existingGuests?: Array<{ id?: string; name: string; dietary?: string; type?: 'adult' | 'child' }>;
}

export const AddGuestModal: React.FC<AddGuestModalProps> = ({ isOpen, onClose, onSave, existingGuests = [] }) => {
  const [guests, setGuests] = useState<Guest[]>([
    { name: '', type: 'adult', dietary: '' },
  ]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Load existing guests or start with empty form
      if (existingGuests.length > 0) {
        setGuests(existingGuests.map(g => ({
          name: g.name,
          type: g.type || 'adult',
          dietary: g.dietary || ''
        })));
      } else {
        setGuests([{ name: '', type: 'adult', dietary: '' }]);
      }
    }
  }, [isOpen, existingGuests]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  const addGuest = (type: 'adult' | 'child') => {
    setGuests([...guests, { name: '', type, dietary: '' }]);
  };

  const removeGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const updateGuestName = (index: number, name: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index].name = name;
    setGuests(updatedGuests);
  };

  const updateGuestDietary = (index: number, dietary: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index].dietary = dietary;
    setGuests(updatedGuests);
  };

  const handleSave = () => {
    const validGuests = guests.filter(g => g.name.trim() !== '');
    if (validGuests.length > 0) {
      onSave(validGuests);
      setGuests([{ name: '', type: 'adult', dietary: '' }]);
      handleClose();
    }
  };

  const getPlaceholder = (type: 'adult' | 'child') => {
    return type === 'adult' ? 'Name of Adult' : 'Name of Child';
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex items-end justify-center transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-full px-4 pt-8 pb-16 bg-white rounded-t-3xl shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-1 outline-offset-[-1px] outline-blue-950/10 flex flex-col justify-center items-start gap-5 transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="self-stretch opacity-70 rounded-xs flex justify-end items-end">
          <button
            onClick={handleClose}
            className="bg-transparent border-none cursor-pointer p-0 flex items-center gap-2"
          >
            <div className="text-blue-950 text-base font-normal font-['Inter'] leading-6">Close</div>
            <div className="relative">
              <X size={16} color="#26275A" strokeWidth={1.33} />
            </div>
          </button>
        </div>

        <div className="self-stretch h-16 flex flex-col justify-start items-center gap-2">
          <div className="text-center justify-start text-blue-950 text-lg font-semibold font-['Outfit'] leading-4">
            Add Guest(s)
          </div>
          <div className="w-72 text-center justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-5">
            Enter a single guest of group of guests in the same invite.
          </div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            {guests.map((guest, index) => (
              <div key={index} className="self-stretch h-11 min-h-11 flex flex-col justify-start items-start gap-2">
                <div className="self-stretch flex-1 pl-6 pr-3 py-2 bg-slate-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-950/10 inline-flex justify-start items-center gap-2 overflow-hidden">
                  <input
                    type="text"
                    placeholder={getPlaceholder(guest.type)}
                    value={guest.name}
                    onChange={(e) => updateGuestName(index, e.target.value)}
                    className="flex-1 justify-start text-slate-500 text-sm font-normal font-['Inter'] bg-transparent border-none outline-none"
                  />
                  <button
                    onClick={() => {}}
                    className="w-20 justify-start text-[#10B981] text-[10px] font-normal font-['Inter'] bg-transparent border-none cursor-pointer"
                  >
                    Add Dietary
                  </button>
                  <button
                    onClick={() => removeGuest(index)}
                    className="relative bg-transparent border-none cursor-pointer p-0"
                  >
                    <X size={16} color="#26275A" strokeWidth={1} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="self-stretch inline-flex justify-start items-start gap-2.5">
            <button
              onClick={() => addGuest('adult')}
              className="min-h-10 px-6 py-2 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-950/20 flex justify-center items-center gap-2.5 border-none cursor-pointer"
            >
              <div className="flex justify-start items-center gap-2.5">
                <div className="relative">
                  <Plus size={16} color="#26275A" strokeWidth={1.33} />
                </div>
              </div>
              <div className="justify-start text-blue-950 text-sm font-medium font-['Inter'] leading-5">Adult</div>
            </button>
            <button
              onClick={() => addGuest('child')}
              className="min-h-10 px-6 py-2 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-950/20 flex justify-center items-center gap-2.5 border-none cursor-pointer"
            >
              <div className="flex justify-start items-center gap-2.5">
                <div className="relative">
                  <Plus size={16} color="#26275A" strokeWidth={1.33} />
                </div>
              </div>
              <div className="justify-start text-blue-950 text-sm font-medium font-['Inter'] leading-5">Child</div>
            </button>
          </div>

          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <button
              onClick={handleSave}
              className="flex-1 h-12 min-h-10 px-6 py-2 bg-emerald-300 rounded-3xl shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] flex justify-center items-center gap-2.5 border-none cursor-pointer"
            >
              <div className="justify-start text-blue-950 text-sm font-medium font-['Inter'] leading-5">Save Guests</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
