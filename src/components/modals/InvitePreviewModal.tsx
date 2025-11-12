import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, MapPinIcon, SunIcon, ClockIcon, ChevronDownIcon } from '@/components/icons';
import { GuestListModal } from './GuestListModal';

interface InvitePreviewModalProps {
  open: boolean;
  party: {
    party_name: string;
    child_name: string;
    child_dob?: string;
    cover_image_url?: string;
    event_date: string;
    start_time: string;
    end_time?: string;
    location: string;
    description?: string;
    temperature?: string;
    theme_id?: string;
    theme_name?: string;
    theme_bg_color?: string;
    gift_ideas: string[];
    rsvp_deadline?: string;
  };
  onClose: () => void;
}

export const InvitePreviewModal: React.FC<InvitePreviewModalProps> = ({
  open,
  party,
  onClose,
}) => {
  console.log({ party })
  const [rsvpStatus, setRsvpStatus] = useState('going');
  const [maybeMessage, setMaybeMessage] = useState('');
  const [cantGoMessage, setCantGoMessage] = useState('');
  const [isGuestListOpen, setIsGuestListOpen] = useState(false);
  
  const sampleGuestList = [
    { id: '1', name: 'Mike Chen', initials: 'MC' },
    { id: '2', name: 'Emma Davis', initials: 'ED' },
    { id: '3', name: 'David Smith', initials: 'DS' },
    { id: '4', name: 'David Smith', initials: 'DS' },
    { id: '5', name: 'David Smith', initials: 'DS' },
    { id: '6', name: 'David Smith', initials: 'DS' },
    { id: '7', name: 'David Smith', initials: 'DS' },
  ];

  const handleSelectGuest = (guestId: string) => {
    console.log('Selected guest:', guestId);
    setIsGuestListOpen(false);
  };

  const handleAddDetails = () => {
    console.log('Add my details');
    setIsGuestListOpen(false);
  };
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';

    try {
      let date: Date;

      if (dateString.includes('/')) {
        const [month, day, year] = dateString.split('/');
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else if (dateString.includes('-')) {
        date = new Date(dateString);
      } else {
        return dateString;
      }

      if (isNaN(date.getTime())) {
        return dateString;
      }

      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string): string => {
    if (!timeString) return '';

    try {
      if (timeString.toLowerCase().includes('am') || timeString.toLowerCase().includes('pm')) {
        return timeString.toLowerCase();
      }

      const [hours, minutes] = timeString.split(':');
      if (!hours || !minutes) return timeString;

      const hour = parseInt(hours, 10);
      if (isNaN(hour)) return timeString;

      const ampm = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return timeString;
    }
  };

  const sampleGuests = [
    { initials: 'AT' },
    { initials: 'HA' },
    { initials: 'LM' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent 
        className="w-96 px-4 py-8 bg-gradient-to-b from-red-300 to-blue-950 rounded-3xl shadow-lg outline outline-1 outline-offset-[-1px] outline-blue-950/10 border-none max-h-[90vh] overflow-y-auto" 
        onPointerDownOutside={(e) => e.preventDefault()} 
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {/* Dialog Header */}
          <div className="self-stretch h-11 flex flex-col justify-start items-start gap-2">
            <div className="w-80 h-4 relative">
              <div className="absolute left-[109.84px] top-[-0.50px] text-center text-white text-lg font-semibold font-['Outfit'] leading-4">
                Invite Preview
              </div>
            </div>
            <div className="w-80 flex-1 relative">
              <div className="absolute left-[21.87px] top-[0.50px] text-center text-white text-sm font-normal font-['Inter'] leading-5">
                This is how your invite will look to recipients
              </div>
            </div>
          </div>

          {/* Create Event Section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {/* Card */}
            <div 
              className="self-stretch h-72 p-4 rounded-3xl shadow-[0px_0px_37.85714340209961px_-4.7142863273620605px_rgba(38,39,90,1.00)] flex flex-col justify-between items-end overflow-hidden relative"
            >
              {/* Background Image */}
              <img 
                src={party.cover_image_url || '/party-background.png'} 
                alt="Party background"
                className="absolute inset-0 w-full h-full object-cover -z-10"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-blue-950/75 -z-[5]" />
              
              {/* Header */}
              <div className="self-stretch flex justify-between items-center z-10">
                <div className="flex-1 flex justify-start items-center gap-2.5">
                  <div className="text-center text-white text-lg font-medium font-['Outfit'] leading-7">
                    You're Invited
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  {sampleGuests.map((guest, index) => (
                    <div key={index} className="size-8 bg-emerald-300 rounded-full shadow-md outline outline-2 outline-offset-[-2px] outline-white flex justify-center items-center">
                      <div className="text-blue-950 text-xs font-bold font-['Inter'] leading-5">
                        {guest.initials}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Party Details */}
              <div className="self-stretch p-3 bg-white/0 rounded-2xl backdrop-blur-md flex flex-col justify-start items-start gap-2 z-10">
                <div className="self-stretch flex justify-start items-center gap-2.5">
                  <div className="flex-1 text-white text-3xl font-medium font-['Outfit'] leading-9">
                    {party.party_name}
                  </div>
                </div>
                <div className="self-stretch h-6 flex justify-start items-center gap-2">
                  <CalendarIcon />
                  <div className="flex-1 text-gray-200 text-base font-normal font-['Inter'] leading-6">
                    {formatDate(party.event_date)}, {formatTime(party.start_time)}
                  </div>
                </div>
                <div className="self-stretch h-6 flex justify-start items-center gap-2">
                  <MapPinIcon />
                  <div className="flex-1 text-gray-200 text-base font-normal font-['Inter'] leading-6">
                    {party.location}
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <SunIcon />
                    <div className="text-gray-200 text-xs font-normal font-['Inter'] leading-6">
                      {party.temperature || '31'}˚
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Container Section */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              {/* RSVP Date */}
              <div className="self-stretch pt-2 border-t border-white/20 flex flex-col justify-start items-start">
                <button className="self-stretch min-h-10 px-6 py-2 bg-blue-950/20 rounded-lg flex justify-center items-center gap-2.5">
                  <ClockIcon />
                  <div className="text-green-50 text-sm font-medium font-['Inter'] leading-5">
                    RSVP by {party.rsvp_deadline ? formatDate(party.rsvp_deadline) : 'June 8'}
                  </div>
                </button>
              </div>

              {/* RSVP Options */}
              <div className="self-stretch pt-2 border-t border-white/20 flex flex-col justify-start items-start gap-2">
                <div className="self-stretch px-32 flex justify-center items-center gap-2.5">
                  <div className="text-center text-green-50 text-xs font-normal font-['Inter'] leading-4">
                    RSVP Options
                  </div>
                </div>
                
                {/* RSVP Card */}
                <div className="self-stretch flex flex-col justify-center items-center p-1 pb-4 gap-2 bg-white shadow-[0px_0px_16px_0px_rgba(0,0,0,0.10)] rounded-3xl">
                  {/* Tabs */}
                  <Tabs value={rsvpStatus} onValueChange={setRsvpStatus} className="w-full">
                    <TabsList className="w-full p-0 bg-transparent h-auto gap-0.5">
                      <TabsTrigger 
                        value="going" 
                        className="flex-1 min-h-10 px-6 py-2 rounded-[100px] data-[state=active]:bg-emerald-300 data-[state=inactive]:bg-white data-[state=active]:text-blue-950 data-[state=inactive]:text-blue-950/20 text-sm font-medium font-['Inter'] leading-5 shadow-none"
                      >
                        Going
                      </TabsTrigger>
                      <TabsTrigger 
                        value="maybe" 
                        className="flex-1 min-h-10 px-6 py-2 rounded-[100px] data-[state=active]:bg-emerald-300 data-[state=inactive]:bg-white data-[state=active]:text-blue-950 data-[state=inactive]:text-blue-950/20 text-sm font-medium font-['Inter'] leading-5 shadow-none"
                      >
                        Maybe
                      </TabsTrigger>
                      <TabsTrigger 
                        value="cantgo" 
                        className="flex-1 min-h-10 px-6 py-2 rounded-[100px] data-[state=active]:bg-emerald-300 data-[state=inactive]:bg-white data-[state=active]:text-blue-950 data-[state=inactive]:text-blue-950/20 text-sm font-medium font-['Inter'] leading-5 shadow-none"
                      >
                        Can't Go
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  {/* Tab Content */}
                  <div className="w-full flex flex-col items-start px-2 py-4 gap-4">
                    {rsvpStatus === 'going' && (
                      <>
                        {/* Attendee Search */}
                        <div className="w-full flex flex-col items-start gap-2">
                          <button 
                            onClick={() => setIsGuestListOpen(true)}
                            className="w-full h-10 px-6 bg-slate-50 border border-blue-950/10 rounded-3xl flex justify-between items-center"
                          >
                            <span className="text-slate-500 text-sm font-normal font-['Inter'] leading-[17px]">
                              Who are you RSVPing for?
                            </span>
                            <ChevronDownIcon />
                          </button>
                        </div>
                      </>
                    )}
                    
                    {rsvpStatus === 'maybe' && (
                      <>
                        {/* Leave a message */}
                        <div className="w-full flex flex-col items-start gap-2">
                          <div className="text-blue-950 text-base font-medium font-['Inter'] leading-6">
                            Leave a message
                          </div>
                          <textarea 
                            className="w-full h-32 px-6 py-4 bg-slate-50 border border-blue-950/10 rounded-3xl text-slate-500 text-sm font-normal font-['Inter'] leading-[17px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-950/20"
                            placeholder="Optional message..."
                            value={maybeMessage}
                            onChange={(e) => setMaybeMessage(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                    
                    {rsvpStatus === 'cantgo' && (
                      <>
                        {/* Leave a message */}
                        <div className="w-full flex flex-col items-start gap-2">
                          <div className="text-blue-950 text-base font-medium font-['Inter'] leading-6">
                            Leave a message
                          </div>
                          <textarea 
                            className="w-full h-32 px-6 py-4 bg-slate-50 border border-blue-950/10 rounded-3xl text-slate-500 text-sm font-normal font-['Inter'] leading-[17px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-950/20"
                            placeholder="Optional message..."
                            value={cantGoMessage}
                            onChange={(e) => setCantGoMessage(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                    
                    {/* Confirm Button */}
                    <button className="w-20 h-10 px-3 py-2 bg-blue-950 rounded-[100px] flex justify-center items-center gap-2.5 self-center">
                      <span className="text-emerald-300 text-sm font-medium font-['Inter'] leading-5">
                        Confirm
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Gift Ideas */}
              {party.gift_ideas && party.gift_ideas.length > 0 && (
                <div className="self-stretch flex flex-col justify-start items-center gap-2">
                  <div className="flex justify-center items-center gap-2.5">
                    <div className="text-green-50 text-sm font-normal font-['Outfit'] leading-5">
                      Gift Ideas
                    </div>
                  </div>
                  <div className="flex justify-start items-start gap-2">
                    {party.gift_ideas.map((gift, index) => (
                      <div key={index} className="h-5 px-2 py-0.5 bg-green-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-emerald-300/20 flex justify-center items-center gap-1 overflow-hidden">
                        <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">
                          {gift}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="self-stretch flex justify-center items-start gap-0.5">
                <div className="text-center text-slate-500 text-xs font-normal font-['Inter'] leading-4">
                  Sent with
                </div>
                <div className="text-center text-emerald-300 text-xs font-normal font-['Outfit'] leading-4">
                  Superglow
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Guest List Modal */}
      <GuestListModal
        open={isGuestListOpen}
        onClose={() => setIsGuestListOpen(false)}
        guests={sampleGuestList}
        onSelectGuest={handleSelectGuest}
        onAddDetails={handleAddDetails}
      />
    </Dialog>
  );
};
