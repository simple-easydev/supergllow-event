import React from 'react';

export const ImageUploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_image_upload" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
        <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_image_upload)">
        <path d="M9 25C8.45 25 7.97917 24.8042 7.5875 24.4125C7.19583 24.0208 7 23.55 7 23V9C7 8.45 7.19583 7.97917 7.5875 7.5875C7.97917 7.19583 8.45 7 9 7H17V9H9V23H23V15H25V23C25 23.55 24.8042 24.0208 24.4125 24.4125C24.0208 24.8042 23.55 25 23 25H9ZM10 21H22L18.25 16L15.25 20L13 17L10 21ZM21 13V11H19V9H21V7H23V9H25V11H23V13H21Z" fill="#2D3748"/>
      </g>
    </svg>
  );
};
