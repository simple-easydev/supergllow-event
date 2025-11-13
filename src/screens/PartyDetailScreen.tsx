import React, { useState } from 'react';
import { PartyTabContent } from '@/components/PartyTabContent';
import { GuestsTabContent } from '@/components/GuestsTabContent';
import { GiftsTabContent } from '@/components/GiftsTabContent';
import { MessagesTabContent } from '@/components/MessagesTabContent';
import { MemoriesTabContent } from '@/components/MemoriesTabContent';

type TabType = 'party' | 'guests' | 'gifts' | 'messages' | 'memories';

export const PartyDetailScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('party');

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#BA7A60] to-[#26275A] flex flex-col">
      {/* Header */}
      <div className="h-20 px-7 flex-shrink-0 flex justify-between items-center">
        <div className="flex justify-start items-center gap-2.5">
          <button
            className="size-4 relative overflow-hidden bg-transparent border-none cursor-pointer p-0"
            onClick={() => window.history.back()}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6666 8.00016H3.33331M3.33331 8.00016L7.99998 12.6668M3.33331 8.00016L7.99998 3.3335" stroke="#26275A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex justify-start items-center gap-2.5">
          <button className="size-4 relative overflow-hidden bg-transparent border-none cursor-pointer p-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66663 8.00016V13.3335C2.66663 13.6871 2.8071 14.0263 3.05715 14.2763C3.3072 14.5264 3.64634 14.6668 3.99996 14.6668H12C12.3536 14.6668 12.6927 14.5264 12.9428 14.2763C13.1928 14.0263 13.3333 13.6871 13.3333 13.3335V8.00016M10.6666 4.00016L7.99996 1.3335M7.99996 1.3335L5.33329 4.00016M7.99996 1.3335V10.0002" stroke="#26275A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-3 overflow-auto">
        {/* Tab Bar */}
        <div className="w-full p-1 bg-blue-950/20 rounded-full shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] flex justify-between items-center relative">
          {/* Party Tab */}
          <button 
            onClick={() => setActiveTab('party')}
            className={`flex-1 px-3 py-1 rounded-full flex flex-col justify-center items-center ${activeTab === 'party' ? 'bg-blue-950/20' : 'bg-white/0'}`}
          >
            <div className={`text-xs font-medium font-['Inter'] leading-5 ${activeTab === 'party' ? 'text-white' : 'text-blue-950'}`}>Party</div>
          </button>

          {/* Guests Tab */}
          <button 
            onClick={() => setActiveTab('guests')}
            className={`flex-1 px-3 py-1 rounded-full flex flex-col justify-center items-center ${activeTab === 'guests' ? 'bg-blue-950/20' : 'bg-white/0'}`}
          >
            <div className={`text-xs font-medium font-['Inter'] leading-5 ${activeTab === 'guests' ? 'text-white' : 'text-blue-950'}`}>Guests</div>
          </button>

          {/* Gifts Tab */}
          <button 
            onClick={() => setActiveTab('gifts')}
            className={`flex-1 px-3 py-1 rounded-full flex flex-col justify-center items-center ${activeTab === 'gifts' ? 'bg-blue-950/20' : 'bg-white/0'}`}
          >
            <div className={`text-xs font-medium font-['Inter'] leading-5 ${activeTab === 'gifts' ? 'text-white' : 'text-blue-950'}`}>Gifts</div>
          </button>

          {/* Messages Tab */}
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex-1 px-3 py-1 rounded-full flex flex-col justify-center items-center ${activeTab === 'messages' ? 'bg-blue-950/20' : 'bg-white/0'}`}
          >
            <div className="relative inline-flex">
              <div className={`text-xs font-medium font-['Inter'] leading-5 ${activeTab === 'messages' ? 'text-white' : 'text-blue-950'}`}>Messages</div>
              {/* Alert Badge */}
              <div className="absolute -top-0.5 -right-2">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="4" fill="#EF4444"/>
                </svg>
              </div>
            </div>
          </button>

          {/* Memories Tab */}
          <button 
            onClick={() => setActiveTab('memories')}
            className={`flex-1 px-3 py-1 rounded-full flex flex-col justify-center items-center ${activeTab === 'memories' ? 'bg-blue-950/20' : 'bg-white/0'}`}
          >
            <div className={`text-xs font-medium font-['Inter'] leading-5 ${activeTab === 'memories' ? 'text-white' : 'text-blue-950'}`}>Memories</div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-3">
          {activeTab === 'party' && <PartyTabContent />}
          {activeTab === 'guests' && <GuestsTabContent />}
          {activeTab === 'gifts' && <GiftsTabContent />}
          {activeTab === 'messages' && <MessagesTabContent />}
          {activeTab === 'memories' && <MemoriesTabContent />}
        </div>
      </div>
    </div>
  );
};
