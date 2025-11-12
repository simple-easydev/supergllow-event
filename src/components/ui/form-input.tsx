import * as React from "react"
import { Label } from "./label"
import { Input } from "./input"
import { cn } from "@/lib/utils"

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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M2 6.66683H14M3.33333 2.66683H12.6667C13.403 2.66683 14 3.26378 14 4.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V4.00016C2 3.26378 2.59695 2.66683 3.33333 2.66683Z" stroke="#26275A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {shouldShowTimeIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2313_3712)">
                  <path d="M7.99967 4.00016V8.00016L10.6663 9.3335M14.6663 8.00016C14.6663 11.6821 11.6816 14.6668 7.99967 14.6668C4.31778 14.6668 1.33301 11.6821 1.33301 8.00016C1.33301 4.31826 4.31778 1.3335 7.99967 1.3335C11.6816 1.3335 14.6663 4.31826 14.6663 8.00016Z" stroke="#26275A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_2313_3712">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
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
