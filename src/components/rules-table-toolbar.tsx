import React from "react";
import { useRulesStore } from "../stores/rules-store";

export const TableToolbar: React.FC = () => {
  const addNewRule = useRulesStore((state) => state.add);

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Word & Phrase Blocking Rules</h2>
      <button
        onClick={addNewRule}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <span>Add new rule</span>
      </button>
    </div>
  );
};
