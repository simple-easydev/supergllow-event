import * as React from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface MobileDatePickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  label?: string
  inline?: boolean
  disabled?: boolean
}

export function MobileDatePicker({
  date,
  onDateChange,
  placeholder = "MM/DD/YYYY",
  className,
  label,
  inline = false,
  disabled = false
}: MobileDatePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onDateChange(new Date(e.target.value))
    } else {
      onDateChange(undefined)
    }
  }

  const formatDateForInput = (date: Date) => {
    return format(date, 'yyyy-MM-dd')
  }

  // Inline mode (for DOB field with calendar icon)
  if (inline) {
    return (
      <div
        onClick={() => !disabled && inputRef.current?.showPicker()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          background: 'transparent',
          maxWidth: 'fit-content',
          flexShrink: 0,
          opacity: disabled ? 0.5 : 1
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '18px',
            color: '#26275A',
            whiteSpace: 'nowrap'
          }}
        >
          {date ? format(date, 'MM/dd/yyyy') : 'DOB'}
        </span>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M2 6.66683H14M3.33333 2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683Z" stroke="#26275A" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          ref={inputRef}
          type="date"
          value={date ? formatDateForInput(date) : ''}
          onChange={handleDateChange}
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

  // Full mode (with label and styled container)
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
            fontSize: '16px',
            color: date ? '#1E293B' : '#CBD5E0',
            flex: 1
          }}
        >
          {date ? format(date, 'MM/dd/yyyy') : placeholder}
        </span>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M2 6.66683H14M3.33333 2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683Z" stroke="#26275A" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Hidden native date input */}
      <input
        ref={inputRef}
        type="date"
        value={date ? formatDateForInput(date) : ''}
        onChange={handleDateChange}
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
