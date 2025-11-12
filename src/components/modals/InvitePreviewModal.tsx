import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Clock, ChevronDown, X } from 'lucide-react';

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

type RSVPStatus = 'going' | 'maybe' | 'cant-go' | null;

interface Guest {
  name: string;
  type: 'adult' | 'child';
}

export const InvitePreviewModal: React.FC<InvitePreviewModalProps> = ({
  open,
  party,
  onClose,
}) => {
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>('going');
  const [showDropdown, setShowDropdown] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([{ name: 'Mike Chen', type: 'adult' }]);
  const [message, setMessage] = useState('');
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
    } catch (error) {
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
    } catch (error) {
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
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-red-300 to-blue-950 border-none p-8 max-h-[90vh] overflow-y-auto" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-lg font-semibold font-['Outfit'] text-center">
              Invite Preview
            </h2>
            <p className="text-white text-sm font-normal font-['Inter'] text-center">
              This is how your invite will look to recipients
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div data-layer="Card 2" data-property-1="Short" className="Card2 self-stretch h-72 p-4 bg-blend-multiply bg-gradient-to-b from-black/0 to-blue-950/75 rounded-3xl shadow-[0px_0px_37.85714340209961px_-4.7142863273620605px_rgba(38,39,90,1.00)] inline-flex flex-col justify-between items-end overflow-hidden" style={{ backgroundImage: 'url(/image copy copy copy copy copy.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div data-layer="Header" className="Header self-stretch inline-flex justify-between items-center">
                <div data-layer="Heading" className="Heading flex-1 flex justify-start items-center gap-2.5">
                  <div data-layer="You're Invited!" className="YouReInvited text-center justify-start text-white text-lg font-medium font-['Outfit'] leading-7">You're Invited</div>
                </div>
                <div data-layer="Attendees" className="Attendees size- flex justify-end items-center">
                  {sampleGuests.map((guest, index) => (
                    <div key={index} data-layer="Container" className="Container size-8 bg-emerald-300 rounded-full shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md outline outline-2 outline-offset-[-2px] outline-white flex justify-center items-center">
                      <div data-layer={guest.initials} className="justify-start text-blue-950 text-xs font-bold font-['Inter'] leading-5">{guest.initials}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div data-layer="Party Details" className="PartyDetails self-stretch p-3 bg-white/0 rounded-2xl backdrop-blur-xs flex flex-col justify-start items-start gap-2">
                <div data-layer="Heading 1" className="Heading1 self-stretch inline-flex justify-start items-center gap-2.5">
                  <div data-layer="Sam's Superhero Party" className="SamSSuperheroParty flex-1 justify-start text-white text-3xl font-medium font-['Outfit'] leading-9">{party.party_name}</div>
                </div>
                <div data-layer="Date" className="Date self-stretch h-6 inline-flex justify-start items-center gap-2">
                  <div data-svg-wrapper data-layer="Calendar" data-size="48" className="Calendar relative">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M2 6.66683H14M3.33333 2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M2 6.66683H14M3.33333 2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683Z" stroke="url(#paint0_linear_2746_372)" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_2746_372" x1="8" y1="1.3335" x2="8" y2="14.6668" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0FDF4"/>
                    <stop offset="0.5" stopColor="white"/>
                    <stop offset="1" stopColor="#EFF6FF"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>
                  <div data-layer="Jun 14, 1:00 pm" className="Jun14100Pm flex-1 justify-start text-gray-200 text-base font-normal font-['Inter'] leading-6">{formatDate(party.event_date)}, {formatTime(party.start_time)}</div>
                </div>
                <div data-layer="Location" className="Location self-stretch h-6 inline-flex justify-start items-center gap-2">
                  <div data-svg-wrapper data-layer="Map pin" data-size="48" className="MapPin relative">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6.6665C14 11.3332 8 15.3332 8 15.3332C8 15.3332 2 11.3332 2 6.6665C2 5.0752 2.63214 3.54908 3.75736 2.42386C4.88258 1.29864 6.4087 0.666504 8 0.666504C9.5913 0.666504 11.1174 1.29864 12.2426 2.42386C13.3679 3.54908 14 5.0752 14 6.6665Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 6.6665C14 11.3332 8 15.3332 8 15.3332C8 15.3332 2 11.3332 2 6.6665C2 5.0752 2.63214 3.54908 3.75736 2.42386C4.88258 1.29864 6.4087 0.666504 8 0.666504C9.5913 0.666504 11.1174 1.29864 12.2426 2.42386C13.3679 3.54908 14 5.0752 14 6.6665Z" stroke="url(#paint0_linear_2746_377)" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8.6665C9.10457 8.6665 10 7.77107 10 6.6665C10 5.56193 9.10457 4.6665 8 4.6665C6.89543 4.6665 6 5.56193 6 6.6665C6 7.77107 6.89543 8.6665 8 8.6665Z" stroke="url(#paint1_linear_2746_377)" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_2746_377" x1="8" y1="0.666504" x2="8" y2="15.3332" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0FDF4"/>
                    <stop offset="0.5" stopColor="white"/>
                    <stop offset="1" stopColor="#EFF6FF"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_2746_377" x1="8" y1="0.666504" x2="8" y2="15.3332" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F0FDF4"/>
                    <stop offset="0.5" stopColor="white"/>
                    <stop offset="1" stopColor="#EFF6FF"/>
                    </linearGradient>
                    </defs>
                    </svg>
                  </div>
                  <div data-layer="Riverside Park" className="RiversidePark flex-1 justify-start text-gray-200 text-base font-normal font-['Inter'] leading-6">{party.location}</div>
                  <div data-layer="Weather" className="Weather size- flex justify-start items-center gap-2">
                    <div data-svg-wrapper data-layer="Sun" data-size="48" className="Sun relative">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.08333 0.75V2.08333M8.08333 14.0833V15.4167M2.89667 2.89667L3.84333 3.84333M12.3233 12.3233L13.27 13.27M0.75 8.08333H2.08333M14.0833 8.08333H15.4167M2.89667 13.27L3.84333 12.3233M12.3233 3.84333L13.27 2.89667M11.4167 8.08333C11.4167 9.92428 9.92428 11.4167 8.08333 11.4167C6.24238 11.4167 4.75 9.92428 4.75 8.08333C4.75 6.24238 6.24238 4.75 8.08333 4.75C9.92428 4.75 11.4167 6.24238 11.4167 8.08333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.08333 0.75V2.08333M8.08333 14.0833V15.4167M2.89667 2.89667L3.84333 3.84333M12.3233 12.3233L13.27 13.27M0.75 8.08333H2.08333M14.0833 8.08333H15.4167M2.89667 13.27L3.84333 12.3233M12.3233 3.84333L13.27 2.89667M11.4167 8.08333C11.4167 9.92428 9.92428 11.4167 8.08333 11.4167C6.24238 11.4167 4.75 9.92428 4.75 8.08333C4.75 6.24238 6.24238 4.75 8.08333 4.75C9.92428 4.75 11.4167 6.24238 11.4167 8.08333Z" stroke="url(#paint0_linear_2746_382)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                      <linearGradient id="paint0_linear_2746_382" x1="8.08333" y1="0.75" x2="8.08333" y2="15.4167" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F0FDF4"/>
                      <stop offset="0.5" stopColor="white"/>
                      <stop offset="1" stopColor="#EFF6FF"/>
                      </linearGradient>
                      </defs>
                      </svg>
                    </div>
                    <div data-layer="31˚" className="justify-start text-gray-200 text-xs font-normal font-['Inter'] leading-6">{party.temperature || '31'}˚</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="pt-2 border-t border-white/20 flex flex-col">
                <button className="min-h-10 px-6 py-2 bg-blue-950/20 rounded-lg flex justify-center items-center gap-2.5">
                  <Clock size={16} className="text-white" strokeWidth={2} />
                  <div className="text-green-50 text-sm font-medium font-['Inter']">
                    RSVP by {party.rsvp_deadline ? formatDate(party.rsvp_deadline) : 'June 8'}
                  </div>
                </button>
              </div>

              <div className="pt-2 border-t border-white/20 flex flex-col gap-3">
                <div className="text-center text-green-50 text-xs font-normal font-['Inter']">
                  RSVP Options
                </div>
                <div className="p-1 bg-white rounded-3xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.10)] flex gap-0.5">
                  <button
                    onClick={() => setRsvpStatus('going')}
                    className={`flex-1 min-h-10 px-6 py-2 rounded-full text-sm font-medium font-['Inter'] transition-colors ${
                      rsvpStatus === 'going' ? 'bg-emerald-300 text-blue-950' : 'text-gray-400'
                    }`}
                  >
                    Going
                  </button>
                  <button
                    onClick={() => setRsvpStatus('maybe')}
                    className={`flex-1 min-h-10 px-6 py-2 rounded-full text-sm font-medium font-['Inter'] transition-colors ${
                      rsvpStatus === 'maybe' ? 'bg-emerald-300 text-blue-950' : 'text-gray-400'
                    }`}
                  >
                    Maybe
                  </button>
                  <button
                    onClick={() => setRsvpStatus('cant-go')}
                    className={`flex-1 min-h-10 px-6 py-2 rounded-full text-sm font-medium font-['Inter'] transition-colors ${
                      rsvpStatus === 'cant-go' ? 'bg-emerald-300 text-blue-950' : 'text-gray-400'
                    }`}
                  >
                    Can't Go
                  </button>
                </div>

                {rsvpStatus === 'going' && (
                  <div className="flex flex-col gap-3">
                    {guests.map((guest, index) => (
                      <div key={index} className="px-6 py-4 bg-white rounded-full flex items-center justify-between border border-gray-200">
                        <span className="text-gray-600 text-base font-normal font-['Inter']">{guest.name}</span>
                        <div className="flex items-center gap-4">
                          <button className="text-emerald-500 text-sm font-medium font-['Inter'] hover:text-emerald-600">
                            Add Dietary
                          </button>
                          <button
                            onClick={() => setGuests(guests.filter((_, i) => i !== index))}
                            className="text-gray-900 hover:text-gray-600"
                          >
                            <X size={20} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => setGuests([...guests, { name: 'Additional Adult', type: 'adult' }])}
                        className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-800 text-base font-medium font-['Inter'] hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="text-xl font-normal">+</span>
                        Adult
                      </button>
                      <button
                        onClick={() => setGuests([...guests, { name: 'Additional Child', type: 'child' }])}
                        className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-800 text-base font-medium font-['Inter'] hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="text-xl font-normal">+</span>
                        Child
                      </button>
                    </div>

                    <div className="flex justify-center pt-2">
                      <button className="px-12 py-3 bg-blue-950 rounded-full text-emerald-300 text-base font-medium font-['Inter'] hover:bg-blue-900 shadow-lg">
                        Confirm
                      </button>
                    </div>
                  </div>
                )}

                {(rsvpStatus === 'maybe' || rsvpStatus === 'cant-go') && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <label className="text-blue-950 text-lg font-medium font-['Inter']">
                        Leave a message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Optional message..."
                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-0 text-gray-500 text-base font-normal font-['Inter'] placeholder:text-gray-400 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      />
                    </div>

                    <div className="flex justify-center pt-2">
                      <button className="px-12 py-3 bg-blue-950 rounded-full text-emerald-300 text-base font-medium font-['Inter'] hover:bg-blue-900 shadow-lg">
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {party.gift_ideas && party.gift_ideas.length > 0 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-green-50 text-sm font-normal font-['Outfit']">
                    Gift Ideas
                  </div>
                  <div className="flex gap-2">
                    {party.gift_ideas.map((gift, index) => (
                      <div
                        key={index}
                        className="h-5 px-2 py-0.5 bg-green-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-emerald-300/20 flex justify-center items-center"
                      >
                        <div className="text-blue-950 text-xs font-medium font-['Inter']">
                          {gift}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <span className="text-slate-500 text-xs font-normal font-['Inter']">
                  Sent with{' '}
                </span>
                <span className="text-emerald-300 text-xs font-normal font-['Outfit']">
                  Superglow
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
