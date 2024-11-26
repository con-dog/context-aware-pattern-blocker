import React from "react";

export const RuleRow: React.FC = () => {
  return (
    <tr key={rule.id}>
      <td className="px-6 py-4">{rule.name}</td>
      <td className="px-6 py-4">{rule.description}</td>
      <td className="px-6 py-4">{rule.blockPattern}</td>
      <td className="px-6 py-4">{rule.blockMode}</td>
      <td className="px-6 py-4">{rule.blockContexts.join(", ")}</td>
      <td className="px-6 py-4">{rule.category}</td>
      <td className="px-6 py-4">{/* Add edit/delete buttons here */}</td>
    </tr>
  );
};
