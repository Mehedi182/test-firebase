export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
};

export type Budget = {
  id: string;
  category: string;
  amount: number;
  spent: number;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
};


export type Account = {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit card' | 'investment' | 'other';
  balance: number;
};

export type TotalBalance = {
  total_balance: float;
  // income: float;
  // expenses: float;
};

export type MonthlySummary = {
  // month: string; // e.g., "2023-09"
  income: number;
  expense: number;
  // balance: number;
};

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  type: 'income' | 'expense' | 'other';
  is_active: boolean;
};
