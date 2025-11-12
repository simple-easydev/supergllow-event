import React from 'react';

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        d="M12 5V19M5 12H19" 
        stroke="#66FFB8" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
