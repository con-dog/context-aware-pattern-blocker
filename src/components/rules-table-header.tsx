// components/TableHeader.tsx
import React from 'react';
import {Tooltip} from './tooltip';
import { TableHeaderProps } from '../types/types';

export const TableHeader: React.FC<TableHeaderProps> = ({ title, tooltip }) => {
  return (
    <div className="flex items-center space-x-1">
      {title}
      <Tooltip text={tooltip}>
        <span className="cursor-help text-gray-500">?</span>
      </Tooltip>
    </div>
  );
};
