import { create } from "zustand";
import { Filter } from "../API/https";
const useFilterOptions = create((set) => ({
  cities: [],
  state: [],
  specialities: [],
  loadingCities: false,
  loadingStates: false,
  loadingSpecialities: false,
  errorCities: null,
  errorStates: null,
  errorSpecialities: null,
  fetchCities: async () => {
    set({ loadingCities: true, errorCities: false });
    try {
      const response = await Filter.getCity();
      if (response.data.success && response.data) {
        const formattedCities = response.data.data.map((city) => ({
          label: city.name,
          value: city.name,
        }));
        set({ cities: formattedCities, loadingCities: false });
      } else {
        set({
          errorCities: response.data.message || "Failed to Fetch Cities",
          loadingCities: false,
        });
      }
    } catch (error) {
      set({
        errorCities: error.message || "An unexpected error occured",
        loadingCities: false,
      });
    }
  },
  fetchStates: async () => {
    set({ loadingStates: true, errorStates: null });
    try {
      const response = await Filter.getState();
      if (response.data.success && response.data) {
        const formattedStates = response.data.data.map((state) => ({
          label: state.name,
          value: state.name,
        }));
        set({ state: formattedStates, loadingStates: false });
      } else {
        set({
          errorStates: response.data.message || "Failed to fetch states",
          loadingStates: false,
        });
      }
    } catch (error) {
      set({
        errorStates: error.message || "An unexpected error occurred",
        loadingStates: false,
      });
    }
  },
  fetchSpecialities: async () => {
    set({ loadingSpecialities: true, errorSpecialities: null });
    try {
      const response = await Filter.getSpeciality();
      if (response.data.success && response.data) {
        const formattedSpecialities = response.data.data.map((speciality) => ({
          label: speciality.name,
          value: speciality.name,
        }));
        set({
          specialities: formattedSpecialities,
          loadingSpecialities: false,
        });
      } else {
        set({
          errorSpecialities:
            response.data.message || "Failed to fetch specialities",
          loadingSpecialities: false,
        });
      }
    } catch (error) {
      set({
        errorSpecialities: error.message || "An unexpected error occurred",
        loadingSpecialities: false,
      });
    }
  },
}));
export default useFilterOptions;
