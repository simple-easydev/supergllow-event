import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { Button } from '@/components/ui/button';
import { EventDetails } from '../../lib/supabase';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: EventDetails) => void;
  initialData: EventDetails | null;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [date, setDate] = useState(initialData?.date || '');
  const [startTime, setStartTime] = useState(initialData?.startTime || '');
  const [endTime, setEndTime] = useState(initialData?.endTime || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [temperature, setTemperature] = useState(initialData?.temperature || '');
  const [rsvpDeadline, setRsvpDeadline] = useState(initialData?.rsvpDeadline || '');
  const [dateError, setDateError] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');
  const [rsvpDeadlineError, setRsvpDeadlineError] = useState('');

  const validateDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dateRegex.test(dateString)) return false;
    const [month, day, year] = dateString.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.getMonth() === parseInt(month) - 1 && date.getDate() === parseInt(day);
  };

  const validateTime = (timeString: string): boolean => {
    if (!timeString) return false;
    const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM|am|pm)$/;
    return timeRegex.test(timeString);
  };

  const handleSave = () => {
    setDateError('');
    setStartTimeError('');
    setEndTimeError('');
    setRsvpDeadlineError('');

    let hasError = false;

    if (!date) {
      setDateError('Date is required');
      hasError = true;
    } else if (!validateDate(date)) {
      setDateError('Invalid date format. Use MM/DD/YYYY');
      hasError = true;
    }

    if (!startTime) {
      setStartTimeError('Start time is required');
      hasError = true;
    } else if (!validateTime(startTime)) {
      setStartTimeError('Invalid time format. Use HH:MM AM/PM');
      hasError = true;
    }

    if (endTime && !validateTime(endTime)) {
      setEndTimeError('Invalid time format. Use HH:MM AM/PM');
      hasError = true;
    }

    if (rsvpDeadline && !validateDate(rsvpDeadline)) {
      setRsvpDeadlineError('Invalid date format. Use MM/DD/YYYY');
      hasError = true;
    }

    if (!location) {
      hasError = true;
    }

    if (!hasError) {
      onSave({
        date,
        startTime,
        endTime: endTime || undefined,
        location,
        description: description || undefined,
        temperature: temperature || undefined,
        rsvpDeadline: rsvpDeadline || undefined,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <FormInput
              label="Date*"
              type="text"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateError('');
              }}
            />
            {dateError && (
              <p className="text-red-500 text-sm mt-1">{dateError}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <FormInput
                label="Start Time*"
                type="text"
                placeholder="HH:MM AM/PM"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setStartTimeError('');
                }}
              />
              {startTimeError && (
                <p className="text-red-500 text-sm mt-1">{startTimeError}</p>
              )}
            </div>
            <div>
              <FormInput
                label="End Time"
                type="text"
                placeholder="HH:MM AM/PM"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setEndTimeError('');
                }}
              />
              {endTimeError && (
                <p className="text-red-500 text-sm mt-1">{endTimeError}</p>
              )}
            </div>
          </div>

          <FormInput
            label="Location*"
            placeholder="123 Smith Street"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <FormTextarea
            label="Description"
            placeholder="Tell guests about your event..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormInput
            label="Temperature (optional)"
            placeholder="31"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />

          <div>
            <FormInput
              label="RSVP Deadline"
              type="text"
              placeholder="MM/DD/YYYY"
              value={rsvpDeadline}
              onChange={(e) => {
                setRsvpDeadline(e.target.value);
                setRsvpDeadlineError('');
              }}
            />
            {rsvpDeadlineError && (
              <p className="text-red-500 text-sm mt-1">{rsvpDeadlineError}</p>
            )}
          </div>

          <Button
            onClick={handleSave}
            disabled={!date || !startTime || !location}
            className="w-full"
          >
            Save Event Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
