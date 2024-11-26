import React from 'react';

interface TableToolbarProps {
  addRule: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({addRule}) => {
  return (
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Word & Phrase Blocking Rules</h2>
        <button
          onClick={addRule}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <span>Add new rule</span>
        </button>
      </div>
  )
}