import React, { useState } from "react";
import { TableHeader } from "./rules-table-header";
import { Rule } from "../types/types";
import { TableToolbar } from "./rules-table-toolbar";
import { tableHeaders } from "./rules-table.static";
import { RuleRow } from "./rule-row";

export const RulesTable: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);

  const addRule = () => {
    const newRule: Rule = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      blockPattern: "",
      blockMode: "matching",
      blockContexts: [],
      category: "",
    };
    setRules([...rules, newRule]);
  };

  return (
    <div className="p-6">
      <TableToolbar addRule={addRule} />
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {rules.map((rule) => (
              <RuleRow />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
