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
      /*   STACServerUrl: "https://eod-catalog-svc-prod.astraea.earth",
  updateSTACServerUrl: (newData) => set(() => ({ STACServerUrl: newData })),
  collectionId: "landsat8_c2l1t1",
  updateCollectionId: (newData) => set(() => ({ collectionId: newData })), */
      paginatedData: {},
      updatePaginatedData: (newData) => set(() => ({ paginatedData: newData })),
      bbox: [],
      updateBbox: (newData) => set(() => ({ bbox: newData })),
    }),
    {
      name: "zustand-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      //partialize: (state) => ({ bbox: state.bbox, dateRange: state.dateRange }),
    }
  )
);

// Load specific parts of the state from sessionStorage
/* const storedBbox = JSON.parse(sessionStorage.getItem("zustandBbox")) || [];
useCollectionStore.setState({
  user: { ...useCollectionStore.getState().bbox, ...storedBbox },
});

const storedDateRange =
  JSON.parse(sessionStorage.getItem("zustandDateRange")) || {};
useCollectionStore.setState({
  settings: { ...useCollectionStore.getState().dateRange, ...storedDateRange },
});

// Subscribe to changes and save specific parts of the state to sessionStorage
useCollectionStore.subscribe((state) => {
  sessionStorage.setItem("zustandBbox", JSON.stringify(state.bbox));
  sessionStorage.setItem("zustandDateRange", JSON.stringify(state.dateRange));
}); */

export default useCollectionStore;
