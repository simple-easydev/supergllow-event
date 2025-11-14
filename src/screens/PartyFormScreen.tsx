import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Music, Video, HeartHandshake, ArrowRight, Plus, X, Camera, Clock, MapPin, Info } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { Button } from '@/components/ui/button';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MobileDatePicker } from '@/components/ui/date-picker-mobile';
import { MobileTimePicker } from '@/components/ui/time-picker-mobile';
import { BackgroundModal } from '@/components/modals/BackgroundModal';
import { InvitePreviewModal } from '@/components/modals/InvitePreviewModal';
import { CalendarIcon, ImageUploadIcon, LocationPinIcon } from '@/components/icons';
import { useParty } from '@/contexts';
import { supabase } from '@/lib/supabase';
import { format } from "date-fns"

interface Theme {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
}

const themes: Theme[] = [
  { id: 'superhero', name: 'Superhero', icon: '🦸', bgColor: 'bg-gradient-to-br from-pink-500 to-purple-600' },
  { id: 'birthday', name: 'Birthday', icon: '🎂', bgColor: 'bg-gradient-to-br from-blue-200 to-blue-400' },
  { id: 'fairy', name: 'Fairy', icon: '✨', bgColor: 'bg-gradient-to-br from-pink-200 to-purple-300' },
  { id: 'pamper', name: 'Pamper', icon: '💅', bgColor: 'bg-gradient-to-br from-red-400 to-pink-500' },
  { id: 'disco', name: 'Disco', icon: '🎵', bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600' },
  { id: 'sports', name: 'Sports', icon: '⚽', bgColor: 'bg-gradient-to-br from-green-500 to-blue-600' },
  { id: 'dance', name: 'Dance', icon: '🕺', bgColor: 'bg-gradient-to-br from-indigo-600 to-purple-700' },
  { id: 'science', name: 'Science', icon: '🧪', bgColor: 'bg-gradient-to-br from-teal-400 to-green-400' },
  { id: 'adventure', name: 'Adventure', icon: '🏕️', bgColor: 'bg-gradient-to-br from-orange-500 to-yellow-500' },
];

export const PartyFormScreen: React.FC = () => {
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>();
  const { updateParty } = useParty();
  const isEditMode = Boolean(partyId);

  const [partyName, setPartyName] = useState('');
  const [childName, setChildName] = useState('');
  const [dob, setDob] = useState<Date>();

  const [eventDate, setEventDate] = useState<Date>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rsvpDeadline, setRsvpDeadline] = useState<Date>();
  const [requireParentAttendance, setRequireParentAttendance] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const [videoUrl, setVideoUrl] = useState('');

  const [giftIdeas, setGiftIdeas] = useState<string[]>([]);

  const [errors, setErrors] = useState<{
    eventDate?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    rsvpDeadline?: string;
  }>({});
  const [currentGiftInput, setCurrentGiftInput] = useState('');

  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Fetch party data in edit mode
  useEffect(() => {
    const fetchPartyData = async () => {
      if (!isEditMode || !partyId) return;

      try {
        const { data, error } = await supabase
          .from('parties')
          .select('*')
          .eq('id', partyId)
          .single();

        if (error) {
          console.error('Error fetching party:', error);
          navigate('/');
          return;
        }

        if (data) {
          // Populate all fields with existing party data
          setPartyName(data.party_name || '');
          setChildName(data.child_name || '');
          if (data.child_dob) setDob(new Date(data.child_dob));
          
          if (data.event_date) setEventDate(new Date(data.event_date));
          setStartTime(data.start_time || '');
          setEndTime(data.end_time || '');
          setLocation(data.location || '');
          setDescription(data.description || '');
          setTemperature(data.temperature || '');
          if (data.rsvp_deadline) setRsvpDeadline(new Date(data.rsvp_deadline));
          
          if (data.theme_id) {
            const theme = themes.find(t => t.id === data.theme_id);
            if (theme) setSelectedTheme(theme);
          }
          
          setVideoUrl(data.video_url || '');
          setGiftIdeas(data.gift_ideas || []);
        }
      } catch (err) {
        console.error('Error:', err);
        navigate('/');
      }
    };

    fetchPartyData();
  }, [isEditMode, partyId, navigate]);

  const validateDate = (dateStr: string): boolean => {
    if (!dateStr) return true; // Empty is OK while typing
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/;
    if (!dateRegex.test(dateStr)) return false;
    
    const [month, day, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getMonth() === month - 1 && date.getDate() === day && date.getFullYear() === year;
  };

  const validateTime = (timeStr: string): boolean => {
    if (!timeStr) return true; // Empty is OK while typing
    const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM|am|pm)$/;
    return timeRegex.test(timeStr);
  };

  const validateLocation = (location: string): boolean => {
    return location.trim().length > 0;
  };

  const handleDateBlur = (value: string) => {
    if (value && !validateDate(value)) {
      setErrors(prev => ({ ...prev, eventDate: 'Please enter a valid date (MM/DD/YYYY)' }));
    } else {
      setErrors(prev => ({ ...prev, eventDate: undefined }));
    }
  };

  const handleTimeBlur = (field: 'startTime' | 'endTime', value: string) => {
    if (value && !validateTime(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter a valid time (HH:MM AM/PM)' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLocationBlur = (value: string) => {
    if (value && !validateLocation(value)) {
      setErrors(prev => ({ ...prev, location: 'Please enter a location' }));
    } else {
      setErrors(prev => ({ ...prev, location: undefined }));
    }
  };

  const isEventDetailsComplete = Boolean(eventDate && startTime && location);
  
  const formatDateForSave = (date: Date | undefined): string => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd')
  };
  const isThemeSelected = selectedTheme !== null;
  const isVideoAdded = videoUrl.trim().length > 0;
  const hasGiftIdeas = giftIdeas.length > 0;

  const handleAddGift = () => {
    if (currentGiftInput.trim()) {
      setGiftIdeas([...giftIdeas, currentGiftInput.trim()]);
      setCurrentGiftInput('');
    }
  };

  const handleRemoveGift = (index: number) => {
    setGiftIdeas(giftIdeas.filter((_, i) => i !== index));
  };

  const canContinue = isEditMode || (
    partyName.trim() && 
    childName.trim() && 
    isEventDetailsComplete && 
    !errors.location && 
    !errors.rsvpDeadline &&
    validateTime(startTime) &&
    validateLocation(location)
  );

  const handleSaveUpdate = async () => {
    if (!canContinue || !partyId) return;

    try {
      const { error } = await supabase
        .from('parties')
        .update({
          event_date: formatDateForSave(eventDate),
          start_time: startTime,
          end_time: endTime,
          location: location,
          description: description,
          temperature: temperature,
          rsvp_deadline: formatDateForSave(rsvpDeadline),
          theme_id: selectedTheme?.id,
          theme_name: selectedTheme?.name,
          theme_bg_color: selectedTheme?.bgColor,
          video_url: videoUrl,
          gift_ideas: giftIdeas,
        })
        .eq('id', partyId);

      if (error) {
        console.error('Error updating party:', error);
        return;
      }

      // Navigate back to party detail
      navigate(`/party/${partyId}`);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleCreateParty = async () => {
    if (!canContinue) return;

    try {
      // Get authenticated user from Supabase
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        alert('Please sign in first');
        navigate('/');
        return;
      }

      // Generate unique invite code
      const generateInviteCode = (): string => {
        return Math.random().toString(36).substring(2, 15);
      };

      const inviteCode = generateInviteCode();
      const inviteLink = `${window.location.origin}/i/${inviteCode}`;

      // Prepare party data for database
      const partyData = {
        user_id: user.id,
        party_name: partyName,
        child_name: childName,
        child_dob: formatDateForSave(dob),
        event_date: formatDateForSave(eventDate),
        start_time: startTime,
        end_time: endTime,
        location: location,
        description: description,
        temperature: temperature || '31',
        video_url: videoUrl,
        theme_id: selectedTheme?.id,
        theme_name: selectedTheme?.name,
        theme_bg_color: selectedTheme?.bgColor,
        allow_non_listed_guests: true,
        collect_dietaries: true,
        rsvp_deadline: formatDateForSave(rsvpDeadline),
        invite_code: inviteCode,
        invite_link: inviteLink,
        gift_ideas: giftIdeas,
      };

      // Create party in Supabase
      const { data: createdParty, error: partyError } = await supabase
        .from('parties')
        .insert([partyData])
        .select()
        .single();

      if (partyError) {
        console.error('Error creating party:', partyError);
        alert('Failed to create party. Please try again.');
        return;
      }

      // Update party context with the created party data
      updateParty(createdParty);

      // Navigate to guest list with party ID
      navigate(`/guests/${createdParty.id}`);
    } catch (err) {
      console.error('Error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '0px',
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: isEditMode 
          ? 'linear-gradient(180deg, #BA7A60 0%, #26275A 100%)' 
          : 'linear-gradient(180deg, #66FFB8 0%, #26275A 100%), #FFFFFF',
        borderRadius: '0px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 32px',
          gap: '63.24px',
          width: '100%',
          height: '80px',
          borderRadius: '0px',
          flex: 'none',
          order: 0,
          alignSelf: 'stretch',
          flexGrow: 0
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowLeft size={20} color="#26275A" strokeWidth={2} />
        </button>

        <button
          onClick={() => setShowPreviewModal(true)}
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#26275A',
            cursor: 'pointer'
          }}
        >
          Preview
        </button>
      </div>

      <ScrollArea className="w-full flex-1">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px 16px 16px',
            gap: '26px',
            width: '100%',
            borderRadius: '0px'
          }}
        >
        <div
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}
        >
          <input
            type="text"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            disabled={isEditMode}
            placeholder="Party Name*"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              color: isEditMode ? '#26275A80' : '#26275A',
              cursor: isEditMode ? 'not-allowed' : 'text'
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              overflow: 'hidden'
            }}
          >
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              disabled={isEditMode}
              placeholder="Child's Name*"
              style={{
                flex: 1,
                minWidth: 0,
                width:"100%",
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '18px',
                color: isEditMode ? '#26275A80' : '#26275A',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: isEditMode ? 'not-allowed' : 'text'
              }}
            />

            <MobileDatePicker
              date={dob}
              onDateChange={setDob}
              placeholder=""
              inline={true}
              disabled={isEditMode}
            />
          </div>
        </div>

        <Accordion 
          className="w-full" 
          defaultValue={isEditMode ? ['event-details', 'party-theme', 'video-invite', 'wishlist'] : []}
        >
          <AccordionItem value="event-details" completed={isEventDetailsComplete}>
            <AccordionTrigger
              value="event-details"
              icon={<Calendar size={28} color="#66FFB8" strokeWidth={2} />}
              completed={isEventDetailsComplete}
            >
              Add Event Details
            </AccordionTrigger>
            <AccordionContent value="event-details">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <MobileDatePicker
                  date={eventDate}
                  onDateChange={setEventDate}
                  placeholder="MM/DD/YYYY"
                  label="Date"
                  className="w-full"
                />

                <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100%' }}>
                  <MobileTimePicker
                    time={startTime}
                    onTimeChange={(time) => setStartTime(time || '')}
                    placeholder="HH:MM"
                    label="Start Time"
                    className="flex-1"
                  />
                  <MobileTimePicker
                    time={endTime}
                    onTimeChange={(time) => setEndTime(time || '')}
                    placeholder="HH:MM"
                    label="End Time"
                    className="flex-1"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                  <FormInput
                    label="Location"
                    placeholder="123 Smith Street"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onBlur={(e) => handleLocationBlur(e.target.value)}
                    icon={<LocationPinIcon style={{ width: '20px', height: '20px' }} />}
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: errors.location ? '1.5px solid #EF4444' : 'none'
                    }}
                  />
                  {errors.location && (
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#EF4444',
                      paddingLeft: '4px'
                    }}>
                      {errors.location}
                    </span>
                  )}
                </div>

                <FormTextarea
                  label="Description"
                  placeholder="Tell guests about your event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                  <MobileDatePicker
                    date={rsvpDeadline}
                    onDateChange={setRsvpDeadline}
                    placeholder="MM/DD/YYYY"
                    label="RSVP By Date (Optional)"
                    className="w-full"
                  />
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: '#64748B',
                    margin: 0,
                    paddingLeft: '4px'
                  }}>
                    Set a deadline for guests to respond
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0px', gap: '13px', width: '100%', height: '40px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '6px', width: '212px', height: '20px', margin: '0 auto' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal', fontWeight: 500, fontSize: '14px', lineHeight: '20px', textAlign: 'center', color: '#26275A' }}>Require a parent attendance</span>
                    <Info size={16} strokeWidth={1} color="#26275A" />
                  </div>
                  <Switch
                    checked={requireParentAttendance}
                    onCheckedChange={setRequireParentAttendance}
                    style={{ margin: '0 auto' }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="party-theme" completed={isThemeSelected}>
            <AccordionTrigger
              value="party-theme"
              icon={<Music size={28} color="#66FFB8" strokeWidth={2} />}
              completed={isThemeSelected}
            >
              {selectedTheme ? `${selectedTheme.name} Theme` : 'Add a Party Theme'}
            </AccordionTrigger>
            <AccordionContent value="party-theme">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <ScrollArea className="w-[320px]">
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gridAutoFlow: 'column',
                    gap: '16px',
                    paddingBottom: '8px',
                    width: 'max-content'
                  }}>
                      {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme)}
                        style={{
                          boxSizing: 'border-box',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '12px',
                          gap: '8px',
                          minWidth: '95px',
                          width: '95px',
                          height: '95px',
                          background: selectedTheme?.id === theme.id ? 'rgba(102, 255, 184, 0.2)' : '#FFFFFF',
                          border: selectedTheme?.id === theme.id ? '1px solid #66FFB8' : '1px solid rgba(38, 39, 90, 0.1)',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none',
                          flexShrink: 0
                        }}
                      >
                        <div
                          className={theme.bgColor}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '16777200px',
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#FFFFFF'
                          }}
                        >
                          {theme.icon}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px',
                            gap: '2px',
                            width: '70px',
                            height: '20px'
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontStyle: 'normal',
                              fontWeight: 500,
                              fontSize: '14px',
                              lineHeight: '20px',
                              color: '#26275A',
                              textAlign: 'center'
                            }}
                          >
                            {theme.name}
                          </span>
                        </div>
                      </button>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <button
                  onClick={() => setIsBackgroundModalOpen(true)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '0px 26px',
                    gap: '10px',
                    width: '311px',
                    height: '32px',
                    background: 'rgba(240, 253, 244, 0.5)',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    alignSelf: 'stretch',
                    outline: 'none'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '0px',
                      gap: '8px',
                      width: '195px',
                      height: '32px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0px',
                        width: '32px',
                        height: '32px'
                      }}
                    >
                      <ImageUploadIcon />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1px 0px',
                        gap: '10px',
                        width: '155px',
                        height: '32px',
                        alignSelf: 'stretch'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Outfit, sans-serif',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '20px',
                          color: '#26275A'
                        }}
                      >
                        Add Custom Background
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="video-invite" completed={isVideoAdded}>
            <AccordionTrigger
              value="video-invite"
              icon={<Video size={28} color="#66FFB8" strokeWidth={2} />}
              completed={isVideoAdded}
            >
              Add a Video to the invite
            </AccordionTrigger>
            <AccordionContent value="video-invite">
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '100%',
                background: '#FFFFFF',
                borderRadius: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '48px 24px',
                  gap: '24px',
                  background: '#F7FAFC',
                  border: '2px dashed #CBD5E0',
                  borderRadius: '12px'
                }}>
                  <Camera size={64} color="#94A3B8" strokeWidth={1.5} />
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '28px',
                    color: '#64748B',
                    textAlign: 'center',
                    margin: 0
                  }}>
                    Record a special message for your party invite
                  </p>
                  <button style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px 104px',
                    gap: '10px',
                    width: '242px',
                    height: '36px',
                    background: '#66FFB8',
                    borderRadius: '100px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#26275A',
                    whiteSpace: 'nowrap'
                  }}>
                    Start recording
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '8px 0'
                }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#94A3B8',
                    fontWeight: 400
                  }}>or</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: '#FFFFFF',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      color: '#94A3B8'
                    }}
                  />
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#94A3B8',
                    textAlign: 'center',
                    margin: 0,
                    fontWeight: 400
                  }}>
                    Add a YouTube or Vimeo link
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="wishlist" completed={hasGiftIdeas}>
            <AccordionTrigger
              value="wishlist"
              icon={<HeartHandshake size={28} color="#66FFB8" strokeWidth={2} />}
              completed={hasGiftIdeas}
            >
              Wishlist (Optional) {hasGiftIdeas && `• ${giftIdeas.length} ideas`}
            </AccordionTrigger>
            <AccordionContent value="wishlist">
              <div className="space-y-4" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                  <Input
                    placeholder="Enter gift idea..."
                    value={currentGiftInput}
                    onChange={(e) => setCurrentGiftInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddGift()}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '4px 12px',
                      height: '36px',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      flex: 1,
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '19px',
                      color: '#64748B',
                      border: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    onClick={handleAddGift}
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#66FFB8',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <Plus size={20} color="#26275A" />
                  </button>
                </div>

                {giftIdeas.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {giftIdeas.map((gift, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px',
                          background: '#F0FDF4',
                          border: '2px solid #66FFB8',
                          borderRadius: '12px',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <span style={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '19px',
                          color: '#000000'
                        }}>{gift}</span>
                        <button
                          onClick={() => handleRemoveGift(index)}
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                        >
                          <X size={20} color="#000000" strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/70">
                    <p>No gift ideas added yet</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {isEditMode ? (
          <PrimaryButton onClick={handleSaveUpdate}>
            Save Update
          </PrimaryButton>
        ) : (
          <PrimaryButton 
            onClick={handleCreateParty}
            disabled={!canContinue}
            showArrow
          >
            Continue to Invite Guests
          </PrimaryButton>
        )}
        </div>
      </ScrollArea>

      <BackgroundModal
        isOpen={isBackgroundModalOpen}
        onClose={() => setIsBackgroundModalOpen(false)}
        onSelectBackground={(bg) => {
          setSelectedBackground(bg);
          setIsBackgroundModalOpen(false);
        }}
      />

      <InvitePreviewModal
        open={showPreviewModal}
        party={{
          party_name: partyName || '',
          child_name: childName || '',
          event_date: formatDateForSave(eventDate) || '',
          start_time: startTime || '',
          end_time: endTime,
          location: location || '',
          description: description,
          temperature: temperature || '31',
          gift_ideas: giftIdeas,
          rsvp_deadline: formatDateForSave(rsvpDeadline),
        }}
        onClose={() => setShowPreviewModal(false)}
      />
    </div>
  );
};
