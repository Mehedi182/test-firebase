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
