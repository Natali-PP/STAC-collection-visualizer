import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCollectionStore = create(
  persist(
    (set) => ({
      activeCollection: {},
      showAsset: false,
      updateActiveCollection: (newData) =>
        set(() => ({ activeCollection: newData })),
      toggleShowAsset: (value) => set(() => ({ showAsset: value })),
      dateRange: {
        startDate: new Date(2020, 0, 1).toISOString().slice(0, 10),
        endDate: new Date(2020, 1, 1).toISOString().slice(0, 10),
      },
      updateDateRange: (newData) => set(() => ({ dateRange: newData })),
      paginatedData: {},
      updatePaginatedData: (newData) => set(() => ({ paginatedData: newData })),
      bbox: [],
      updateBbox: (newData) => set(() => ({ bbox: newData })),
    }),
    {
      name: "zustand-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCollectionStore;
