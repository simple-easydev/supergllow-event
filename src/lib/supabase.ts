import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface Party {
  id: string;
  user_id: string;
  party_name: string;
  child_name: string;
  child_dob: string;
  event_date: string;
  start_time: string;
  end_time?: string;
  location: string;
  description?: string;
  temperature?: string;
  cover_image_url?: string;
  video_url?: string;
  theme_id?: string;
  theme_name?: string;
  theme_bg_color?: string;
  allow_non_listed_guests: boolean;
  collect_dietaries: boolean;
  rsvp_deadline?: string;
  invite_code: string;
  invite_link: string;
  gift_ideas: string[];
  guests?: Array<{ id?: string; name: string; dietary?: string; type?: 'adult' | 'child' }>;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  party_id: string;
  name: string;
  email?: string;
  dietary_restrictions?: string;
  rsvp_status: 'pending' | 'going' | 'maybe' | 'declined';
  rsvp_message?: string;
  rsvp_date?: string;
  created_at: string;
}

export interface EventDetails {
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  description?: string;
  temperature?: string;
  rsvpDeadline?: string;
}

export interface Theme {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
}

export interface PartyFormData {
  partyName: string;
  childName: string;
  childDob: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  location: string;
  description?: string;
  temperature?: string;
  rsvpDeadline?: string;
  theme?: Theme;
  videoUrl?: string;
  giftIdeas: string[];
}

function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function createParty(userId: string, formData: PartyFormData): Promise<Party | null> {
  try {
    const inviteCode = generateInviteCode();
    const inviteLink = `${window.location.origin}/invite/${inviteCode}`;

    const { data, error } = await supabase
      .from('parties')
      .insert({
        user_id: userId,
        party_name: formData.partyName,
        child_name: formData.childName,
        child_dob: formData.childDob,
        event_date: formData.eventDate,
        start_time: formData.startTime,
        end_time: formData.endTime,
        location: formData.location,
        description: formData.description,
        temperature: formData.temperature,
        rsvp_deadline: formData.rsvpDeadline,
        theme_id: formData.theme?.id,
        theme_name: formData.theme?.name,
        theme_bg_color: formData.theme?.bgColor,
        video_url: formData.videoUrl,
        gift_ideas: formData.giftIdeas,
        invite_code: inviteCode,
        invite_link: inviteLink,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating party:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating party:', error);
    return null;
  }
}

export async function updateParty(partyId: string, formData: Partial<PartyFormData>): Promise<Party | null> {
  try {
    const updateData: any = {};

    if (formData.partyName !== undefined) updateData.party_name = formData.partyName;
    if (formData.childName !== undefined) updateData.child_name = formData.childName;
    if (formData.childDob !== undefined) updateData.child_dob = formData.childDob;
    if (formData.eventDate !== undefined) updateData.event_date = formData.eventDate;
    if (formData.startTime !== undefined) updateData.start_time = formData.startTime;
    if (formData.endTime !== undefined) updateData.end_time = formData.endTime;
    if (formData.location !== undefined) updateData.location = formData.location;
    if (formData.description !== undefined) updateData.description = formData.description;
    if (formData.temperature !== undefined) updateData.temperature = formData.temperature;
    if (formData.rsvpDeadline !== undefined) updateData.rsvp_deadline = formData.rsvpDeadline;
    if (formData.theme !== undefined) {
      updateData.theme_id = formData.theme?.id;
      updateData.theme_name = formData.theme?.name;
      updateData.theme_bg_color = formData.theme?.bgColor;
    }
    if (formData.videoUrl !== undefined) updateData.video_url = formData.videoUrl;
    if (formData.giftIdeas !== undefined) updateData.gift_ideas = formData.giftIdeas;

    const { data, error } = await supabase
      .from('parties')
      .update(updateData)
      .eq('id', partyId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating party:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating party:', error);
    return null;
  }
}
