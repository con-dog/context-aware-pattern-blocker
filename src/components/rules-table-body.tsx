import React from "react";
import { Rule } from "../types/types";
import { RuleRow } from "./rule-row";
import { useRulesStore } from "../stores/rules-store";

export const RulesTableBody: React.FC = () => {
  const rules = useRulesStore((state) => state.rules);

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rules.map((rule) => (
        <RuleRow />
      ))}
    </tbody>
  );
};
