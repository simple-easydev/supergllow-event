import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  openItems: string[];
  openedItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({ children, className, defaultValue = [] }) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);
  const [openedItems, setOpenedItems] = useState<string[]>(defaultValue);

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    
    // Track that this item has been opened at least once
    setOpenedItems((prev) => 
      prev.includes(value) ? prev : [...prev, value]
    );
  };

  return (
    <AccordionContext.Provider value={{ openItems, openedItems, toggleItem }}>
      <div className={cn('flex flex-col gap-4', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  completed?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, value, className, completed }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = context.openItems.includes(value);
  const hasBeenOpened = context.openedItems.includes(value);
  const isStartState = !completed && !hasBeenOpened && !isOpen;
  const isOpenState = isOpen;
  const isClosedState = (completed || hasBeenOpened) && !isOpen;

  return (
    <div
      className={cn('w-full', className)}
      data-value={value}
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        background: isStartState ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF',
        border: '1px solid rgba(38, 39, 90, 0.1)',
        borderRadius: '14px',
        boxShadow: (isOpenState || isClosedState)
          ? '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)'
          : 'none',
        padding: isOpenState ? '20px 24px' : isClosedState ? '24px 24px' : '40px 24px',
        gap: '30px',
        transition: 'all 300ms ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  completed?: boolean;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  value,
  icon,
  completed,
  className,
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const isOpen = context.openItems.includes(value);
  const hasBeenOpened = context.openedItems.includes(value);
  const isStartState = !completed && !hasBeenOpened && !isOpen;
  const isOpenState = isOpen;
  const isClosedState = (completed || hasBeenOpened) && !isOpen;

  return (
    <button
      onClick={() => context.toggleItem(value)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: isStartState ? 'center' : 'space-between',
        alignItems: 'center',
        padding: '0px',
        gap: isStartState ? '20px' : '24px',
        width: '100%',
        minHeight: '20px',
        background: isClosedState ? '#FFFFFF' : 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      className={className}
    >
      {isStartState && icon && (
        <div style={{ width: '24px', height: '24px', flexShrink: 0 }}>
          {icon}
        </div>
      )}

      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '16px',
          color: isStartState ? 'transparent' : '#26275A',
          background: isStartState
            ? 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 50%, #EFF6FF 100%)'
            : 'none',
          WebkitBackgroundClip: isStartState ? 'text' : 'unset',
          backgroundClip: isStartState ? 'text' : 'unset',
          WebkitTextFillColor: isStartState ? 'transparent' : '#26275A',
          textAlign: 'left',
          flex: isStartState ? 'none' : 'none',
        }}
      >
        {children}
      </span>

      {(isOpenState || isClosedState) && (
        <>
          <ChevronDown
            size={20}
            color="#26275A"
            strokeWidth={1.66667}
            style={{
              transform: isOpenState ? 'matrix(1, 0, 0, -1, 0, 0)' : 'none',
              transition: 'transform 300ms ease-in-out',
            }}
          />
        </>
      )}
    </button>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, value, className }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const isOpen = context.openItems.includes(value);

  return (
    <div
      style={{
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '16px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 300ms ease-in-out',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
