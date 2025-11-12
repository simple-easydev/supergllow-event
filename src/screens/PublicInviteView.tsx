import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, ThermometerSun, Clock } from 'lucide-react';
import { supabase, Party } from '../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckmarkIcon } from '@/components/icons';

export const PublicInviteView: React.FC = () => {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const [party, setParty] = useState<Party | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'declined' | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [message, setMessage] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchParty = async () => {
      if (!inviteCode) {
        setError('Invalid invitation link');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('parties')
          .select('*')
          .eq('invite_code', inviteCode)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data) {
          setError('Party not found');
        } else {
          setParty(data);
        }
      } catch (err) {
        console.error('Error fetching party:', err);
        setError('Failed to load invitation');
      } finally {
        setLoading(false);
      }
    };

    fetchParty();
  }, [inviteCode]);

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

  const handleRSVP = async () => {
    if (!rsvpStatus || !guestName.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase.from('guests').insert({
        party_id: party!.id,
        name: guestName.trim(),
        email: guestEmail.trim() || null,
        rsvp_status: rsvpStatus,
        rsvp_message: message.trim() || null,
        dietary_restrictions: dietaryRestrictions.trim() || null,
        rsvp_date: new Date().toISOString(),
      });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-emerald-300 via-teal-400 to-indigo-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading invitation...</div>
      </div>
    );
  }

  if (error || !party) {
    return (
      <div className="bg-gradient-to-b from-emerald-300 via-teal-400 to-indigo-900 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600">{error || 'Invitation not found'}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-b from-emerald-300 via-teal-400 to-indigo-900 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckmarkIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            RSVP Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for responding. We look forward to seeing you!
          </p>
          <p className="text-sm text-gray-500">
            You can close this page now.
          </p>
        </div>
      </div>
    );
  }

  const bgGradient = party.theme_bg_color || 'bg-gradient-to-br from-orange-400 via-yellow-400 to-pink-400';

  return (
    <div className="bg-gradient-to-b from-emerald-300 via-teal-400 to-indigo-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-rose-200 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg mb-4">
            <div className="relative h-64 overflow-hidden">
              {party.cover_image_url ? (
                <img
                  src={party.cover_image_url}
                  alt="Party cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full ${bgGradient}`} />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-gray-900 font-semibold text-sm">
                    You're Invited...
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {party.child_name
                    ? `${party.child_name}'s ${party.party_name || 'Birthday'}`
                    : party.party_name || 'Birthday Party'}
                </h1>

                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {formatDate(party.event_date)}, {formatTime(party.start_time)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="text-sm">{party.location}</span>
                  </div>

                  {party.temperature && (
                    <div className="flex items-center gap-1">
                      <ThermometerSun size={16} />
                      <span className="text-sm">{party.temperature}°</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {party.rsvp_deadline && (
            <div className="flex items-center justify-center gap-2 mb-4 text-white">
              <Clock size={16} />
              <span className="text-sm">
                RSVP by {formatDate(party.rsvp_deadline)}
              </span>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 mb-4">
            <h3 className="text-gray-900 font-bold mb-4 text-center">
              Will you be attending?
            </h3>

            <div className="bg-gray-100 rounded-full p-1.5 flex gap-1 mb-4">
              <button
                onClick={() => setRsvpStatus('going')}
                className={`flex-1 py-3 px-4 rounded-full font-medium text-sm transition-all ${
                  rsvpStatus === 'going'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Going
              </button>
              <button
                onClick={() => setRsvpStatus('maybe')}
                className={`flex-1 py-3 px-4 rounded-full font-medium text-sm transition-all ${
                  rsvpStatus === 'maybe'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Maybe
              </button>
              <button
                onClick={() => setRsvpStatus('declined')}
                className={`flex-1 py-3 px-4 rounded-full font-medium text-sm transition-all ${
                  rsvpStatus === 'declined'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Can't Go
              </button>
            </div>

            {rsvpStatus && (
              <div className="space-y-3">
                <Input
                  placeholder="Your Name*"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="bg-gray-50 border-gray-200 rounded-xl"
                />

                <Input
                  type="email"
                  placeholder="Email (optional)"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="bg-gray-50 border-gray-200 rounded-xl"
                />

                {party.collect_dietaries && rsvpStatus === 'going' && (
                  <Input
                    placeholder="Dietary restrictions (optional)"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    className="bg-gray-50 border-gray-200 rounded-xl"
                  />
                )}

                <Textarea
                  placeholder="Add a message (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="bg-gray-50 border-gray-200 rounded-xl resize-none"
                />

                <Button
                  onClick={handleRSVP}
                  disabled={!guestName.trim() || isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  Confirm RSVP
                </Button>
              </div>
            )}
          </div>

          {party.gift_ideas && party.gift_ideas.length > 0 && (
            <div className="mb-4">
              <p className="text-white text-sm font-medium mb-3 text-center">
                Gift Ideas
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                {party.gift_ideas.map((gift, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2"
                  >
                    <span className="text-white text-sm font-medium">{gift}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-white text-xs opacity-75">
              Sent with <span className="font-semibold text-emerald-300">Superglow</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
