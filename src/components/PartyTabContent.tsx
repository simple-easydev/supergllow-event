import React, { useState } from 'react';
import { PartyCard } from '@/components/PartyCard';
import { Switch } from '@/components/ui/switch';

export const PartyTabContent: React.FC = () => {
  const [allowNonListed, setAllowNonListed] = useState(false);
  const [collectDietaries, setCollectDietaries] = useState(false);
  const [requireParentAttendance, setRequireParentAttendance] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      {/* Invitation Status Bar */}
      <div className="w-full bg-white/20 rounded-2xl shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.10)] outline outline-1 outline-offset-[-1px] outline-white/10">
        <div className="p-4 flex justify-between items-start">
          {/* Going */}
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="w-12 px-2.5 py-1 bg-emerald-300 rounded-full flex justify-center items-center">
              <div className="text-blue-950 text-base font-semibold font-['Inter'] leading-5">2</div>
            </div>
            <div className="text-green-50 text-xs font-normal font-['Inter'] leading-5">Going</div>
          </div>

          {/* Maybe */}
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="w-12 px-2.5 py-1 bg-yellow-300 rounded-full flex justify-center items-center">
              <div className="text-blue-950 text-base font-semibold font-['Inter'] leading-5">1</div>
            </div>
            <div className="text-green-50 text-xs font-normal font-['Inter'] leading-5">Maybe</div>
          </div>

          {/* Pending */}
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="w-12 px-2.5 py-1 bg-white rounded-full flex justify-center items-center">
              <div className="text-blue-950 text-base font-semibold font-['Inter'] leading-5">17</div>
            </div>
            <div className="text-green-50 text-xs font-normal font-['Inter'] leading-5">Pending</div>
          </div>

          {/* Not going */}
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="w-12 px-2.5 py-1 bg-rose-300 rounded-full flex justify-center items-center">
              <div className="text-blue-950 text-base font-semibold font-['Inter'] leading-5">2</div>
            </div>
            <div className="text-green-50 text-xs font-normal font-['Inter'] leading-5">Not going</div>
          </div>
        </div>
      </div>

      {/* Party Card */}
      <PartyCard
        partyName="Sam's Superhero Party"
        eventDate="06/14/2025"
        startTime="1:00 PM"
        location="Riverside Park"
        temperature="22"
        coverImageUrl="/party-background.png"
        actionButtons={
          <>
            {/* Edit Button */}
            <button className="size-8 bg-blue-950/50 rounded-full flex justify-center items-center backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M14.1667 2.50009C14.3856 2.28126 14.6454 2.10765 14.9314 1.98911C15.2173 1.87057 15.5238 1.80933 15.8334 1.80933C16.1429 1.80933 16.4494 1.87057 16.7353 1.98911C17.0213 2.10765 17.2811 2.28126 17.5 2.50009C17.7189 2.71892 17.8925 2.97871 18.011 3.26468C18.1295 3.55064 18.1908 3.85714 18.1908 4.16675C18.1908 4.47637 18.1295 4.78286 18.011 5.06883C17.8925 5.3548 17.7189 5.61458 17.5 5.83342L6.25002 17.0834L1.66669 18.3334L2.91669 13.7501L14.1667 2.50009Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Camera Button */}
            <button className="size-8 bg-blue-950/50 rounded-full flex justify-center items-center backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M19 15C19 15.5304 18.7893 16.0391 18.4142 16.4142C18.0391 16.7893 17.5304 17 17 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V7C1 6.46957 1.21071 5.96086 1.58579 5.58579C1.96086 5.21071 2.46957 5 3 5H6L8 2H12L14 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V15Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 13.5C11.6569 13.5 13 12.1569 13 10.5C13 8.84315 11.6569 7.5 10 7.5C8.34315 7.5 7 8.84315 7 10.5C7 12.1569 8.34315 13.5 10 13.5Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        }
      />

      {/* Button Group */}
      <div className="w-full flex justify-center items-start gap-3">
        {/* Add Guests Button */}
        <button className="flex-1 min-h-10 px-6 py-2 bg-gradient-to-b from-green-50 via-white to-blue-50 rounded-3xl flex justify-center items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.33331 8H12.6666" stroke="#26275A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3.3335V12.6668" stroke="#26275A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="text-blue-950 text-sm font-medium font-['Inter'] leading-5">Add Guests</div>
        </button>

        {/* Send Message Button */}
        <button className="flex-1 min-h-10 px-6 py-2 bg-blue-950 rounded-3xl flex justify-center items-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 7.66669C14.0023 8.5466 13.7967 9.41461 13.4 10.2C12.9296 11.1412 12.2065 11.9328 11.3116 12.4862C10.4168 13.0396 9.3855 13.3329 8.33333 13.3334C7.45342 13.3356 6.58541 13.1301 5.8 12.7334L2 14L3.26667 10.2C2.86995 9.41461 2.66437 8.5466 2.66667 7.66669C2.66707 6.61452 2.96041 5.58325 3.51381 4.68839C4.06722 3.79352 4.85884 3.0704 5.8 2.60002C6.58541 2.20331 7.45342 1.99772 8.33333 2.00002H8.66667C10.0562 2.07668 11.3687 2.66319 12.3528 3.64726C13.3368 4.63132 13.9233 5.94379 14 7.33335V7.66669Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="text-green-50 text-sm font-medium font-['Inter'] leading-5">Send Message</div>
        </button>
      </div>

      {/* Invite Settings Panel */}
      <div className="w-full p-4 bg-white/10 rounded-2xl shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-blue-950/10 flex flex-col gap-4">
        {/* Title */}
        <div className="w-full flex justify-start items-start gap-2">
          <div className="flex-1 text-white text-sm font-semibold font-['Inter'] leading-5">Invite Settings</div>
        </div>

        {/* Settings List */}
        <div className="w-full flex flex-col gap-1.5">
          {/* Allow non-listed guests */}
          <div className="w-full py-1.5 flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <div className="text-white text-sm font-normal font-['Inter'] leading-5">Allow non-listed guests</div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.99998 10.6668V8.00016M7.99998 5.3335H8.00665M14.6666 8.00016C14.6666 11.6821 11.6819 14.6668 7.99998 14.6668C4.31808 14.6668 1.33331 11.6821 1.33331 8.00016C1.33331 4.31826 4.31808 1.3335 7.99998 1.3335C11.6819 1.3335 14.6666 4.31826 14.6666 8.00016Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Switch checked={allowNonListed} onCheckedChange={setAllowNonListed} />
          </div>

          {/* Collect Dietaries */}
          <div className="w-full py-1.5 flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <div className="text-white text-sm font-normal font-['Inter'] leading-5">Collect Dietaries</div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.99998 10.6668V8.00016M7.99998 5.3335H8.00665M14.6666 8.00016C14.6666 11.6821 11.6819 14.6668 7.99998 14.6668C4.31808 14.6668 1.33331 11.6821 1.33331 8.00016C1.33331 4.31826 4.31808 1.3335 7.99998 1.3335C11.6819 1.3335 14.6666 4.31826 14.6666 8.00016Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Switch checked={collectDietaries} onCheckedChange={setCollectDietaries} />
          </div>

          {/* Require parent attendance */}
          <div className="w-full py-1.5 flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <div className="text-white text-sm font-normal font-['Inter'] leading-5">Require parent attendance</div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.99998 10.6668V8.00016M7.99998 5.3335H8.00665M14.6666 8.00016C14.6666 11.6821 11.6819 14.6668 7.99998 14.6668C4.31808 14.6668 1.33331 11.6821 1.33331 8.00016C1.33331 4.31826 4.31808 1.3335 7.99998 1.3335C11.6819 1.3335 14.6666 4.31826 14.6666 8.00016Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Switch checked={requireParentAttendance} onCheckedChange={setRequireParentAttendance} />
          </div>
        </div>
      </div>

      {/* Gift Ideas Panel */}
      <div className="w-full bg-white/20 rounded-2xl shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.10)] outline outline-1 outline-offset-[-1px] outline-white/10">
        <div className="p-4 flex flex-col gap-3">
          {/* Heading */}
          <div className="w-full flex justify-between items-center">
            <div className="text-green-50 text-base font-medium font-['Outfit'] leading-6">Gift Ideas</div>
            <button className="flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8.00004 3.3335V12.6668M3.33337 8.00016H12.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.00004 3.3335V12.6668M3.33337 8.00016H12.6667" stroke="url(#paint0_linear_gift)" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="paint0_linear_gift" x1="8.00004" y1="3.3335" x2="8.00004" y2="12.6668" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0FDF4"/>
                    <stop offset="0.5" stopColor="white"/>
                    <stop offset="1" stopColor="#EFF6FF"/>
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </div>

          {/* Gift Ideas Tags */}
          <div className="w-full h-5 relative">
            <div className="absolute left-0 top-0 px-2 py-0.5 bg-green-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-emerald-300/20 flex justify-center items-center">
              <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">Building blocks</div>
            </div>
            <div className="absolute left-[113px] top-0 px-2 py-0.5 bg-green-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-emerald-300/20 flex justify-center items-center">
              <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">Picture books</div>
            </div>
            <div className="absolute left-[218px] top-0 px-2 py-0.5 bg-green-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-emerald-300/20 flex justify-center items-center">
              <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">Art supplies</div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};
