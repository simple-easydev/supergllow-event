import React from 'react';

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_clock)">
        <path d="M8.00004 4.00016V8.00016L10.6667 9.3335M14.6667 8.00016C14.6667 11.6821 11.6819 14.6668 8.00004 14.6668C4.31814 14.6668 1.33337 11.6821 1.33337 8.00016C1.33337 4.31826 4.31814 1.3335 8.00004 1.3335C11.6819 1.3335 14.6667 4.31826 14.6667 8.00016Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.00004 4.00016V8.00016L10.6667 9.3335M14.6667 8.00016C14.6667 11.6821 11.6819 14.6668 8.00004 14.6668C4.31814 14.6668 1.33337 11.6821 1.33337 8.00016C1.33337 4.31826 4.31814 1.3335 8.00004 1.3335C11.6819 1.3335 14.6667 4.31826 14.6667 8.00016Z" stroke="url(#paint0_linear_clock)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_clock" x1="8.00004" y1="1.3335" x2="8.00004" y2="14.6668" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0FDF4"/>
          <stop offset="0.5" stopColor="white"/>
          <stop offset="1" stopColor="#EFF6FF"/>
        </linearGradient>
        <clipPath id="clip0_clock">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};
