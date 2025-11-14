import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  onClick, 
  disabled = false, 
  children, 
  showArrow = false,
  className = ''
}) => {
  const isActive = !disabled;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px 24px',
        gap: '10px',
        width: '100%',
        height: '40px',
        minHeight: '40px',
        background: isActive ? '#66FFB8' : '#CBD5E0',
        borderRadius: '24px',
        border: 'none',
        cursor: isActive ? 'pointer' : 'not-allowed',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        color: isActive ? '#26275A' : '#64748B',
        opacity: isActive ? 1 : 0.6
      }}
    >
      {children}
      {showArrow && <ArrowRight size={16} color={isActive ? '#26275A' : '#64748B'} strokeWidth={2} />}
    </button>
  );
};
