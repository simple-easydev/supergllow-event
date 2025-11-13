import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParty } from '../contexts/PartyContext';
import { ArrowLeft, Plus, Calendar, MapPin, Sun, Share2, Info, Users, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '../lib/supabase';
import { AddGuestModal } from '../components/modals/AddGuestModal';
import { ShareSheetModal } from '../components/modals/ShareSheetModal';

interface GuestItem {
  id?: string;
  name: string;
  dietary?: string;
  type?: 'adult' | 'child';
}

export const GuestListScreen: React.FC = () => {
  const navigate = useNavigate();
  const { party, updateParty } = useParty();

  const [guests, setGuests] = useState<GuestItem[]>(party?.guests || []);
  const [newGuestName, setNewGuestName] = useState('');
  const [allowNonListed, setAllowNonListed] = useState(party?.allow_non_listed_guests ?? true);
  const [collectDietaries, setCollectDietaries] = useState(party?.collect_dietaries ?? true);
  const [isSharing, setIsSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [isShareSheetModalOpen, setIsShareSheetModalOpen] = useState(false);

  // Load guests from party context when it changes
  useEffect(() => {
    if (party?.guests) {
      setGuests(party.guests);
    }
  }, [party?.guests]);

  // Save guests to party context whenever they change
  useEffect(() => {
    if (guests.length > 0 || party?.guests) {
      updateParty({ guests });
    }
  }, [guests]);

  const handleAddGuest = () => {
    if (newGuestName.trim()) {
      setGuests([...guests, { name: newGuestName.trim() }]);
      setNewGuestName('');
    }
  };

  const handleSaveGuests = (newGuests: Array<{ name: string; type: 'adult' | 'child'; dietary?: string }>) => {
    const formattedGuests = newGuests.map(g => ({
      name: g.name,
      dietary: g.dietary,
      type: g.type
    }));
    setGuests([...guests, ...formattedGuests]);
  };

  const handleRemoveGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
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
        weekday: 'long',
        month: 'long',
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

  const generateInviteCode = (): string => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleShareInvite = async () => {
    if (!party) {
      alert('Please create a party first');
      return;
    }

    setIsSharing(true);
    setShareStatus('idle');

    try {
      // Get authenticated user from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        alert('Please sign in first');
        navigate('/');
        return;
      }

      // Generate unique invite code
      const inviteCode = generateInviteCode();
      const inviteLink = `${window.location.origin}/i/${inviteCode}`;

      // Prepare party data for database
      const partyData = {
        user_id: user.id,
        party_name: party.party_name || '',
        child_name: party.child_name || '',
        child_dob: party.child_dob || new Date().toISOString().split('T')[0],
        event_date: party.event_date || new Date().toISOString().split('T')[0],
        start_time: party.start_time,
        end_time: party.end_time,
        location: party.location || '',
        description: party.description,
        temperature: party.temperature,
        cover_image_url: party.cover_image_url,
        video_url: party.video_url,
        theme_id: party.theme_id,
        theme_name: party.theme_name,
        theme_bg_color: party.theme_bg_color,
        allow_non_listed_guests: allowNonListed,
        collect_dietaries: collectDietaries,
        rsvp_deadline: party.rsvp_deadline,
        invite_code: inviteCode,
        invite_link: inviteLink,
        gift_ideas: party.gift_ideas || [],
      };

      // Create party in Supabase
      const { data: createdParty, error: partyError } = await supabase
        .from('parties')
        .insert([partyData])
        .select()
        .single();

      if (partyError) {
        console.error('Error creating party:', partyError);
        setShareStatus('error');
        alert('Failed to create party. Please try again.');
        setIsSharing(false);
        return;
      }

      // Create guests in database
      if (guests.length > 0 && createdParty) {
        const guestsData = guests.map(guest => ({
          party_id: createdParty.id,
          name: guest.name,
          dietary_restrictions: guest.dietary,
          rsvp_status: 'pending',
        }));

        const { error: guestsError } = await supabase
          .from('guests')
          .insert(guestsData);

        if (guestsError) {
          console.error('Error creating guests:', guestsError);
          // Don't fail the whole process if guests fail
        }
      }

      // Update party context with the created party data including ID and invite link
      updateParty({
        ...createdParty,
        guests: guests,
      });

      setShareStatus('success');
      setIsSharing(false);
      setIsShareSheetModalOpen(true);
    } catch (error) {
      console.error('Error in handleShareInvite:', error);
      setShareStatus('error');
      setIsSharing(false);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#BA7A60] to-[#26275A] flex flex-col">
      {/* Fixed Header - 80px */}
      <div className="h-20 px-7 flex-shrink-0 flex justify-between items-center">
        <div className="flex justify-start items-center gap-2.5">
          <button
            onClick={() => navigate('/create')}
            className="size-4 relative overflow-hidden bg-transparent border-none cursor-pointer p-0"
          >
            <ArrowLeft size={16} className="absolute left-[3.33px] top-[3.33px]" strokeWidth={1} />
          </button>
        </div>
        <div className="flex justify-start items-center gap-2.5">
          <button className="size-4 relative overflow-hidden bg-transparent border-none cursor-pointer p-0">
            <Plus size={10} className="absolute left-[3.33px] top-[3.33px]" strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col justify-start items-start gap-6 pb-6">
        <div className="self-stretch h-72 p-4 bg-blend-multiply bg-gradient-to-b from-black/0 to-blue-950/25 rounded-3xl shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.40)] flex flex-col justify-between items-end overflow-hidden" style={{ backgroundImage: 'url(/party-background.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="self-stretch inline-flex justify-between items-center" />
          <div className="self-stretch p-3 bg-white/0 rounded-2xl backdrop-blur-[4px] flex flex-col justify-start items-start gap-2">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
              <div className="flex-1 justify-start text-white text-3xl font-medium font-['Outfit'] leading-9">
                {party?.party_name || "Sam's Superhero Party"}
              </div>
            </div>
            <div className="self-stretch h-6 inline-flex justify-start items-center gap-2">
              <div className="size-4 relative overflow-hidden">
                <Calendar size={12} className="absolute left-[2px] top-[1.33px]" color="#F0FDF4" strokeWidth={1} />
              </div>
              <div className="flex-1 justify-start text-gray-200 text-base font-normal font-['Inter'] leading-6">
                {party?.event_date && party?.start_time
                  ? `${formatDate(party.event_date)}, ${formatTime(party.start_time)}`
                  : 'Jun 14, 1:00 pm'}
              </div>
            </div>
            <div className="self-stretch h-6 inline-flex justify-start items-center gap-2">
              <div className="size-4 relative overflow-hidden">
                <MapPin size={12} className="absolute left-[2px] top-[0.67px]" color="#F0FDF4" strokeWidth={1} />
              </div>
              <div className="flex-1 justify-start text-gray-200 text-base font-normal font-['Inter'] leading-6">
                {party?.location || 'Riverside Park'}
              </div>
              <div className="flex justify-start items-center gap-2">
                <div className="size-4 relative rounded-[20px]">
                  <Sun size={14} className="absolute left-[0.67px] top-[0.67px]" color="#F0FDF4" strokeWidth={1.5} />
                </div>
                <div className="justify-start text-gray-200 text-xs font-normal font-['Inter'] leading-6">31˚</div>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch p-4 bg-white/10 rounded-2xl shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-1 outline-offset-[-1px] outline-blue-950/10 flex flex-col justify-start items-center gap-4">
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="self-stretch h-8 inline-flex justify-between items-center">
              <div className="w-60 self-stretch flex justify-start items-center gap-2">
                <div className="size-4 relative overflow-hidden">
                  <Users size={12} className="absolute left-[0.67px] top-[2px]" color="#F0FDF4" strokeWidth={1} />
                </div>
                <div className="justify-start text-green-50 text-base font-medium font-['Inter'] leading-4">Guest List</div>
              </div>
              <button
                onClick={() => setIsAddGuestModalOpen(true)}
                className="size-4 relative overflow-hidden bg-transparent border-none cursor-pointer p-0"
              >
                <Plus size={10} className="absolute left-[3.33px] top-[3.33px]" color="#FFFFFF" strokeWidth={1} />
              </button>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch py-1.5 inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-center justify-start text-white text-sm font-normal font-['Inter'] leading-5">
                      Allow non-listed guests
                    </div>
                    <div className="size-4 relative overflow-hidden">
                      <Info size={14} className="absolute left-[1.33px] top-[1.33px]" color="#FFFFFF" strokeWidth={1} />
                    </div>
                  </div>
                  <Switch checked={allowNonListed} onCheckedChange={setAllowNonListed} />
                </div>
                <div className="self-stretch py-1.5 inline-flex justify-between items-center">
                  <div className="flex justify-start items-center gap-2">
                    <div className="text-center justify-start text-white text-sm font-normal font-['Inter'] leading-5">
                      Collect Dietaries
                    </div>
                    <div className="size-4 relative overflow-hidden">
                      <Info size={14} className="absolute left-[1.33px] top-[1.33px]" color="#FFFFFF" strokeWidth={1} />
                    </div>
                  </div>
                  <Switch checked={collectDietaries} onCheckedChange={setCollectDietaries} />
                </div>
              </div>
            </div>

            <div className="self-stretch px-3 py-2 bg-gradient-to-b from-green-50 via-white to-blue-50 rounded-[40px] outline outline-1 outline-offset-[-1px] inline-flex justify-between items-center overflow-hidden">
              <div className="flex-1 h-11 flex justify-start items-center gap-3">
                <div className="size-10 bg-emerald-300 rounded-full shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] flex justify-center items-center">
                  <div className="justify-start text-blue-950 text-sm font-bold font-['Inter'] leading-6">
                    {party?.child_name ? getInitials(party.child_name) : 'JD'}
                  </div>
                </div>
                <div className="flex-1 inline-flex flex-col justify-start items-start">
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="justify-start text-blue-950 text-base font-medium font-['Inter'] leading-6">
                      {party?.child_name || '{Birthday Child Name}'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {guests.map((guest, index) => (
              <div key={index} className="self-stretch h-11 min-h-11 flex flex-col justify-start items-start gap-2">
                <div className="self-stretch flex-1 pl-6 pr-3 py-2 bg-slate-50 rounded-3xl outline outline-1 outline-offset-[-1px] outline-blue-950/10 inline-flex justify-start items-center gap-2 overflow-hidden">
                  <div className="flex-1 justify-start text-slate-500 text-sm font-normal font-['Inter']">
                    {guest.name}
                  </div>
                  <div className="w-20 justify-start text-[#10B981] text-[10px] font-normal font-['Inter']">
                    Add Dietary
                  </div>
                  <button
                    onClick={() => handleRemoveGuest(index)}
                    className="size-4 relative overflow-hidden bg-transparent border-none cursor-pointer p-0"
                  >
                    <X size={8} className="absolute left-[4px] top-[4px]" strokeWidth={1} />
                  </button>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-center gap-3">
          <button
            onClick={handleShareInvite}
            disabled={isSharing}
            className="self-stretch min-h-10 px-6 py-2 bg-emerald-300 rounded-3xl inline-flex justify-center items-center gap-2.5 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="size-4 p-px flex justify-center items-center gap-2.5" />
            <div className="justify-start text-blue-950 text-sm font-medium font-['Inter'] leading-5">
              {isSharing ? 'Creating Invite...' : 'Share Invite'}
            </div>
            {!isSharing && (
              <div className="size-4 relative overflow-hidden">
                <Share2 size={10} className="absolute left-[2.67px] top-[1.33px]" strokeWidth={2} />
              </div>
            )}
          </button>
          <div className="self-stretch px-6 inline-flex justify-center items-center gap-2.5">
            <div className="w-80 text-center justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-5">
              You can manage guests and resend invitations anytime from the event page
            </div>
          </div>
        </div>
        </div>
      </ScrollArea>

      <AddGuestModal
        isOpen={isAddGuestModalOpen}
        onClose={() => setIsAddGuestModalOpen(false)}
        onSave={handleSaveGuests}
        existingGuests={guests}
      />

      <ShareSheetModal
        isOpen={isShareSheetModalOpen}
        onClose={() => setIsShareSheetModalOpen(false)}
        onShare={() => navigate('/')}
      />
    </div>
  );
};
