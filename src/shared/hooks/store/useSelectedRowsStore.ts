import { create } from "zustand";

export type SelectedRow = { id: number; fullName?: string };

type SelectedRowsState = {
  selectedRows: SelectedRow[];
  setSelectedRows: (rows: SelectedRow[]) => void;
  addSelectedRow: (row: SelectedRow) => void;
  clearSelectedRows: () => void;
};

export const useSelectedRowsStore = create<SelectedRowsState>((set) => ({
  selectedRows: [],
  setSelectedRows: (rows: SelectedRow[]) => set({ selectedRows: rows }),
  addSelectedRow: (row: SelectedRow) =>
    set((state: any) => {
      const exists = state.selectedRows.some((r: any) => r.id === row.id);
      if (exists) return { selectedRows: state.selectedRows };
      return { selectedRows: [...state.selectedRows, row] };
    }),
  clearSelectedRows: () => set({ selectedRows: [] })
}));
