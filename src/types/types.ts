export interface Rule {
  id: string;
  name: string;
  description: string;
  blockPattern: string;
  blockMode: 'matching' | 'surrounding';
  blockContexts: string[];
  category: string;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export interface TableHeaderProps {
  title: string;
  tooltip: string;
}