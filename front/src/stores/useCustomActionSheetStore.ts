import { create } from 'zustand';

interface CustomActionSheetStore {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
}

const useCustomActionSheetStore = create<CustomActionSheetStore>(set => ({
  isOpen: false,
  show: () => set({ isOpen: true }),
  hide: () => set({ isOpen: false }),
}));

export default useCustomActionSheetStore;
