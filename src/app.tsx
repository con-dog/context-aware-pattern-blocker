// App.tsx
import React, { useState } from 'react';
import {RulesTable} from './components/rules-table';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'todo'>('rules');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Context Aware Word & Phrase Blocker
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 -mb-px ${
              activeTab === 'rules'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('rules')}
          >
            Rules
          </button>
          <button
            className={`px-4 py-2 -mb-px ${
              activeTab === 'todo'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('todo')}
          >
            TODO
          </button>
        </div>

        {activeTab === 'rules' ? (
          <RulesTable />
        ) : (
          <div className="p-6">TODO content here</div>
        )}
      </div>
    </div>
  );
};

export default App;