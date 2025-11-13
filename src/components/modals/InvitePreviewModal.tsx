import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClockIcon, ChevronDownIcon, XIcon } from '@/components/icons';
import { GuestListModal } from './GuestListModal';
import { PartyCard } from '@/components/PartyCard';

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

  const sampleGuestInitials = ['AT', 'HA', 'LM'];

  return (
    <Dialog open={open} onOpenChange={onClose} modal={true}>
      <DialogContent 
        className="w-96 px-4 py-8 bg-gradient-to-b from-red-300 to-blue-950 rounded-3xl shadow-lg outline outline-1 outline-offset-[-1px] outline-blue-950/10 border-none max-h-[90vh] overflow-y-auto" 
        onPointerDownOutside={(e) => e.preventDefault()} 
        onInteractOutside={(e) => e.preventDefault()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 transition-colors z-20"
          aria-label="Close"
        >
          <XIcon />
        </button>
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
            {/* Party Card */}
            <PartyCard
              partyName={party.party_name}
              eventDate={party.event_date}
              startTime={party.start_time}
              location={party.location}
              temperature={party.temperature}
              coverImageUrl={party.cover_image_url}
              showInviteHeader={true}
              guestInitials={sampleGuestInitials}
              className="self-stretch"
            />

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
