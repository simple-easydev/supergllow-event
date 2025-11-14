import React from 'react';

interface GiftIdeaProps {
  idea: string;
  onRemove?: () => void;
}

export const GiftIdea: React.FC<GiftIdeaProps> = ({ idea, onRemove }) => {
  return (
    <div className="px-2 py-0.5 bg-green-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-emerald-300/20 flex justify-center items-center gap-1.5 group">
      <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">{idea}</div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Remove gift idea"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 3L3 9M3 3L9 9" stroke="#26275A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};
