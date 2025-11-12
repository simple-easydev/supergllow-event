import * as React from "react"
import { Label } from "./label"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { CalendarIcon, ClockIcon } from '@/components/icons'

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  showDateIcon?: boolean
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, icon, showDateIcon, className, id, placeholder, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const isDateField = placeholder?.includes('MM/DD/YYYY')
    const isTimeField = placeholder?.includes('HH:MM')
    const shouldShowDateIcon = showDateIcon || isDateField
    const shouldShowTimeIcon = isTimeField

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <Label htmlFor={inputId}>
            {label}
          </Label>
        )}
        <div className="relative w-full">
          <Input
            id={inputId}
            ref={ref}
            placeholder={placeholder}
            className={cn(
              error && "ring-2 ring-destructive",
              (shouldShowDateIcon || shouldShowTimeIcon || icon) && "pr-10",
              className
            )}
            {...props}
          />
          {shouldShowDateIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <CalendarIcon />
            </div>
          )}
          {shouldShowTimeIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ClockIcon />
            </div>
          )}
          {icon && !shouldShowDateIcon && !shouldShowTimeIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }
