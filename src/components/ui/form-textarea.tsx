import * as React from "react"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { cn } from "@/lib/utils"

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <Label htmlFor={textareaId}>
            {label}
          </Label>
        )}
        <Textarea
          id={textareaId}
          ref={ref}
          className={cn(
            error && "ring-2 ring-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
FormTextarea.displayName = "FormTextarea"

export { FormTextarea }
