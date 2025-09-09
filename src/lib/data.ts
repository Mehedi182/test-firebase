import type { Transaction, Budget, Goal, Account, Category } from './types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: new Date('2024-07-20'), description: 'Monthly Salary', amount: 5000, type: 'income', category: 'Salary' },
  { id: '2', date: new Date('2024-07-21'), description: 'Groceries from Walmart', amount: 150.75, type: 'expense', category: 'Groceries' },
  { id: '3', date: new Date('2024-07-21'), description: 'Electricity Bill', amount: 75.20, type: 'expense', category: 'Utilities' },
  { id: '4', date: new Date('2024-07-22'), description: 'Dinner with friends', amount: 60.00, type: 'expense', category: 'Entertainment' },
  { id: '5', date: new Date('2024-07-23'), description: 'Gas for car', amount: 45.50, type: 'expense', category: 'Transport' },
];

export const mockBudgets: Budget[] = [
  { id: '1', category: 'Groceries', amount: 500, spent: 250.50 },
  { id: '2', category: 'Entertainment', amount: 200, spent: 120.00 },
  { id: '3', category: 'Transport', amount: 150, spent: 85.70 },
  { id: '4', category: 'Shopping', amount: 300, spent: 310.00 },
];

export const mockGoals: Goal[] = [
  { id: '1', name: 'Vacation to Hawaii', targetAmount: 4000, currentAmount: 1500, targetDate: new Date('2025-06-01') },
  { id: '2', name: 'New Laptop', targetAmount: 1800, currentAmount: 1750, targetDate: new Date('2024-08-15') },
];

export const mockAccounts: Account[] = [
  { id: '1', name: 'Chase Checking', type: 'Checking', balance: 5420.50 },
  { id: '2', name: 'Ally High-Yield Savings', type: 'Savings', balance: 15300.00 },
  { id: '3', name: 'Chase Sapphire Reserve', type: 'Credit Card', balance: -750.25 },
  { id: '4', name: 'Vanguard Brokerage', type: 'Investment', balance: 25000.00 },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Groceries', description: 'Food and household supplies', type: 'expense', is_active: true },
  { id: '2', name: 'Salary', description: 'Regular income from employment', type: 'income', is_active: true },
  { id: '3', name: 'Utilities', description: 'Electricity, water, internet, etc.', type: 'expense', is_active: true },
  { id: '4', name: 'Entertainment', description: 'Movies, concerts, etc.', type: 'expense', is_active: true },
  { id: '5', name: 'Transport', description: 'Gas, public transport, etc.', type: 'expense', is_active: true },
  { id: '6', name: 'Shopping', description: 'Clothing, electronics, etc.', type: 'expense', is_active: true },
  { id: '7', name: 'Health', description: 'Insurance, medical bills, etc.', type: 'expense', is_active: false },
  { id: '8', name: 'Freelance', description: 'Income from side projects', type: 'income', is_active: true },
];
