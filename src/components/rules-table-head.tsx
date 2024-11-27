import React from "react";
import { tableHeaders } from "./rules-table-head.static";
import { TableHeader } from "./rules-table-header";

export const RulesTableHead: React.FC = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableHeaders.map((header) => (
          <th className="px-6 py-3 text-left">
            <TableHeader title={header.title} tooltip={header.tooltip} />
          </th>
        ))}
        <th className="px-6 py-3 text-left">Actions</th>
      </tr>
    </thead>
  );
};
