// components/Tooltip.tsx
import React from 'react';
import { TooltipProps } from '../types/types';

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute invisible group-hover:visible bg-gray-900 text-white text-sm rounded p-2 z-50 w-64 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
        {text}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  );
};
