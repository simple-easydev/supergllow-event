import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileTimePickerProps {
  time?: string
  onTimeChange: (time: string | undefined) => void
  placeholder?: string
  className?: string
  label?: string
}

export function MobileTimePicker({
  time,
  onTimeChange,
  placeholder = "Select time",
  className,
  label
}: MobileTimePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      // Convert 24h format to 12h format with AM/PM
      const [hours, minutes] = e.target.value.split(':')
      const hour = parseInt(hours, 10)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12
      onTimeChange(`${hour12}:${minutes} ${ampm}`)
    } else {
      onTimeChange(undefined)
    }
  }

  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    
    if (hours === '12') {
      hours = '00'
    }
    
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12)
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#26275A'
          }}
        >
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.showPicker()}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          background: '#F8FAFC',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          width: '100%',
          boxSizing: 'border-box',
          gap: '8px'
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: time ? '16px' : '14px',
            color: time ? '#1E293B' : '#CBD5E0',
            flex: 1
          }}
        >
          {time || placeholder}
        </span>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <circle cx="8" cy="8" r="6" stroke="#26275A" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 4.66667V8L10 10" stroke="#26275A" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Hidden native time input */}
      <input
        ref={inputRef}
        type="time"
        value={time ? convertTo24Hour(time) : ''}
        onChange={handleTimeChange}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: '1px',
          height: '1px'
        }}
      />
    </div>
  )
}
