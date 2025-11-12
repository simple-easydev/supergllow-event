import { useState, useCallback } from 'react';
import { Party, useParty } from '../contexts/PartyContext';

type PartyFormData = Omit<Party, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'invite_code' | 'invite_link' | 'allow_non_listed_guests' | 'collect_dietaries'>;

export const usePartyForm = (initialData?: Partial<PartyFormData>) => {
  const { updateParty } = useParty();
  
  const [formData, setFormData] = useState<PartyFormData>({
    party_name: initialData?.party_name || '',
    child_name: initialData?.child_name || '',
    child_dob: initialData?.child_dob || '',
    cover_image_url: initialData?.cover_image_url || '',
    event_date: initialData?.event_date || '',
    start_time: initialData?.start_time || '',
    end_time: initialData?.end_time || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    temperature: initialData?.temperature || '',
    theme_id: initialData?.theme_id || '',
    theme_name: initialData?.theme_name || '',
    theme_bg_color: initialData?.theme_bg_color || '',
    video_url: initialData?.video_url || '',
    gift_ideas: initialData?.gift_ideas || [],
    rsvp_deadline: initialData?.rsvp_deadline || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field: keyof PartyFormData, value: string | string[] | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleGiftIdeasChange = useCallback((giftIdeas: string[]) => {
    setFormData(prev => ({ ...prev, gift_ideas: giftIdeas }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.party_name?.trim()) {
      newErrors.party_name = 'Party name is required';
    }

    if (!formData.child_name?.trim()) {
      newErrors.child_name = 'Child name is required';
    }

    if (!formData.event_date) {
      newErrors.event_date = 'Event date is required';
    }

    if (!formData.start_time) {
      newErrors.start_time = 'Start time is required';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    if (!validate()) {
      return false;
    }

    setIsSubmitting(true);
    try {
      // Update the party in context
      updateParty(formData);
      return true;
    } catch (error) {
      console.error('Failed to submit party:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate, updateParty]);

  const resetForm = useCallback(() => {
    setFormData({
      party_name: '',
      child_name: '',
      child_dob: '',
      cover_image_url: '',
      event_date: '',
      start_time: '',
      end_time: '',
      location: '',
      description: '',
      temperature: '',
      theme_id: '',
      theme_name: '',
      theme_bg_color: '',
      gift_ideas: [],
      rsvp_deadline: '',
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleGiftIdeasChange,
    handleSubmit,
    setFormData,
    resetForm,
    validate,
  };
};
