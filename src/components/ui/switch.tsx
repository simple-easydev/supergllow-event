import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, style, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    style={{
      position: 'relative',
      boxSizing: 'border-box',
      width: '64px',
      height: '28px',
      background: props.checked ? '#66FFB8' : 'rgba(120, 120, 120, 0.2)',
      borderRadius: '100px',
      ...style,
    }}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform"
      )}
      style={{
        position: 'absolute',
        width: '39px',
        height: '24px',
        top: '50%',
        transform: props.checked ? 'translate(23px, -50%)' : 'translate(2px, -50%)',
        background: '#FFFFFF',
        borderRadius: '100px',
      }}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
