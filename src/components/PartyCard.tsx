import React from 'react';
import { CalendarIcon, MapPinIcon, SunIcon } from '@/components/icons';

interface Guest {
  name: string;
  id?: string;
  email?: string;
  phone?: string;
  rsvp_status?: string;
  dietary_restrictions?: string;
  guest_type?: string;
}

interface PartyCardProps {
  partyName: string;
  eventDate: string;
  startTime: string;
  location: string;
  temperature?: string;
  coverImageUrl?: string;
  showInviteHeader?: boolean;
  guests?: Guest[];
  showHostLabel?: boolean;
  className?: string;
  height?: string;
  actionButtons?: React.ReactNode;
}

export const PartyCard: React.FC<PartyCardProps> = ({
  partyName,
  eventDate,
  startTime,
  location,
  temperature = '31',
  coverImageUrl = '/party-background.png',
  showInviteHeader = false,
  guests = [],
  showHostLabel = false,
  className = '',
  height = 'h-72',
  actionButtons,
}) => {
  // Generate guest initials from the first 3 guests
  const guestInitials = guests
    .slice(0, 3)
    .map(guest => {
      const names = guest.name.trim().split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return guest.name.substring(0, 2).toUpperCase();
    });
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

  return (
    <div 
      className={`${height} p-4 rounded-3xl shadow-[0px_0px_37.85714340209961px_-4.7142863273620605px_rgba(38,39,90,1.00)] flex flex-col justify-between items-end overflow-hidden relative ${className}`}
    >
      {/* Background Image */}
      <img 
        src={coverImageUrl} 
        alt="Party background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-blue-950/75 z-[1]" />
      
      {/* Header */}
      <div className="self-stretch flex justify-between items-center z-[2]">
        {showInviteHeader ? (
          <>
            <div className="flex-1 flex justify-start items-center gap-2.5">
              <div className="text-center text-white text-lg font-medium font-['Outfit'] leading-7">
                You're Invited
              </div>
            </div>
            {guestInitials.length > 0 && (
              <div className="flex justify-end items-center">
                {guestInitials.map((initials: string, index: number) => (
                  <div key={index} className="size-8 bg-emerald-300 rounded-full shadow-md outline outline-2 outline-offset-[-2px] outline-white flex justify-center items-center">
                    <div className="text-blue-950 text-xs font-bold font-['Inter'] leading-5">
                      {initials}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : showHostLabel ? (
          <>
            <div className="flex-1 flex justify-start items-center gap-2.5">
              <div className="text-white text-2xl font-medium font-['Outfit'] leading-loose">
                Host
              </div>
            </div>
            {guestInitials.length > 0 && (
              <div className="flex justify-end items-center -space-x-2">
                {guestInitials.map((initials: string, index: number) => (
                  <div 
                    key={index} 
                    className="size-12 bg-emerald-300 rounded-full shadow-md outline outline-2 outline-white flex justify-center items-center"
                    style={{ zIndex: guestInitials.length - index }}
                  >
                    <div className="text-blue-950 text-sm font-bold font-['Inter'] uppercase">
                      {initials}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : actionButtons ? (
          <>
            <div className="flex-1 flex justify-start items-center gap-2.5">
              <div className="text-white text-2xl font-medium font-['Outfit'] leading-loose">
                Host
              </div>
            </div>
            <div className="flex justify-end items-center" style={{ gap: '5px' }}>
              {actionButtons}
            </div>
          </>
        ) : (
          <div className="self-stretch flex justify-between items-center" />
        )}
      </div>

      {/* Party Details */}
      <div className="self-stretch p-3 bg-white/0 rounded-2xl backdrop-blur-md flex flex-col justify-start items-start gap-2 z-[2]">
        <div className="self-stretch flex justify-start items-center gap-2.5">
          <div className="flex-1 text-white text-3xl font-medium font-['Outfit'] leading-9">
            {partyName}
          </div>
        </div>
        <div className="self-stretch h-6 flex justify-start items-center gap-2">
          <CalendarIcon />
          <div className="flex-1 text-gray-200 text-base font-normal font-['Inter'] leading-6">
            {formatDate(eventDate)}, {formatTime(startTime)}
          </div>
        </div>
        <div className="self-stretch h-6 flex justify-start items-center gap-2">
          <MapPinIcon />
          <div className="flex-1 text-gray-200 text-base font-normal font-['Inter'] leading-6">
            {location}
          </div>
          <div className="flex justify-start items-center gap-2">
            <SunIcon />
            <div className="text-gray-200 text-xs font-normal font-['Inter'] leading-6">
              {temperature}˚
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
