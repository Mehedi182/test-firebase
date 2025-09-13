import { create } from 'zustand';
import type { Transaction } from '@/lib/types';

type TransactionSheetStore = {
    isOpen: boolean;
    transaction: Transaction | null;
    onOpen: (transaction: Transaction) => void;
    onClose: () => void;
};

export const useTransactionSheet = create<TransactionSheetStore>((set) => ({
    isOpen: false,
    transaction: null,
    onOpen: (transaction) => set({ isOpen: true, transaction }),
    onClose: () => set({ isOpen: false, transaction: null }),
}));
