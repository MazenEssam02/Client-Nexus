import { create } from "zustand";
const useFilterOptions = create((set) => ({
  items: [
    { label: "وسط البلد", value: "وسط البلد" },
    { label: "القاهرة الجديدة", value: "القاهرة الجديدة" },
    { label: "مدينة نصر", value: "مدينة نصر" },
  ],
  setItem: (newItems) => set({ items: newItems }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (value) =>
    set((state) => ({
      items: state.items.filter((item) => item.value != value),
    })),
  clearItems: () => set({ items: [] }),
}));
export default useFilterOptions;
