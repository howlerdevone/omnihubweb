export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'finance',
    name: 'Finance & Accounting',
    description: 'Ledger automation, tax optimization, and asset tracking.',
    icon: 'Wallet',
  },
  {
    id: 'operations',
    name: 'Operations & Management',
    description: 'Workflow streamlining and resource orchestration.',
    icon: 'Settings',
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    description: 'Risk mitigation and document synthesis.',
    icon: 'Scale',
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    description: 'Market intelligence and predictive demand modeling.',
    icon: 'TrendingUp',
  },
];
