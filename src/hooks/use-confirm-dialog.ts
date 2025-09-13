import { create } from 'zustand';

type ConfirmDialogOptions = {
    title: string;
    description: string;
    onConfirm: () => void;
};

type ConfirmDialogStore = {
    isOpen: boolean;
    options: ConfirmDialogOptions;
    onOpen: (options: ConfirmDialogOptions) => void;
    onClose: () => void;
};

export const useConfirmDialog = create<ConfirmDialogStore>((set) => ({
    isOpen: false,
    options: {
        title: "",
        description: "",
        onConfirm: () => { },
    },
    onOpen: (options) => set({ isOpen: true, options }),
    onClose: () => set({ isOpen: false }),
}));
