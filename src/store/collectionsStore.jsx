import { create } from "zustand";

const useCollectionStore = create((set) => ({
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
  STACServerUrl: "https://eod-catalog-svc-prod.astraea.earth",
  updateSTACServerUrl: (newData) => set(() => ({ STACServerUrl: newData })),
  collectionId: "landsat8_c2l1t1",
  updateCollectionId: (newData) => set(() => ({ collectionId: newData })),
  paginatedData: {},
  updatePaginatedData: (newData) => set(() => ({ paginatedData: newData })),
}));

export default useCollectionStore;
