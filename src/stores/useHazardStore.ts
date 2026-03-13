import { create } from "zustand";
import type { Hazard } from "../types/hazard";
import {
  getHazards,
  createHazard,
  updateHazard as updateHazardRequest,
  deleteHazard,
} from "../api/hazardApi";

type HazardStore = {
  hazards: Record<string, Hazard[]>;
  isFetching: boolean;
  isAdding: boolean;
  deletingHazardIds: string[];
  error: string | null;

  fetchHazards: (assessmentId: string) => Promise<void>;
  addHazard: (payload: Partial<Hazard>) => Promise<void>;
  updateHazard: (id: string, payload: Hazard) => Promise<void>;
  removeHazard: (hazardId: string, assessmentId: string) => Promise<void>;
  clearhazards: (assessmentId: string) => void;
  clearError: () => void;
};

export const useHazardStore = create<HazardStore>((set, get) => ({
  hazards: {},
  isFetching: false,
  isAdding: false,
  deletingHazardIds: [],
  error: null,

  fetchHazards: async (assessmentId: string) => {
    set({ isFetching: true, error: null });

    try {
      const response = await getHazards(assessmentId);

      set((state) => ({
        hazards: {
          ...state.hazards,
          [assessmentId]: response.data.data,
        },
      }));
    } catch {
      set({ error: "Failed to load hazards." });
    } finally {
      set({ isFetching: false });
    }
  },

  addHazard: async (payload: Partial<Hazard>) => {
    if (!payload.assessment_id) {
      set({ error: "Assessment ID is required." });
      return;
    }

    set({ isAdding: true, error: null });

    try {
      const response = await createHazard(payload.assessment_id, payload);

      set((state) => {
        const hazard = response.data.data;
        const existingHazards = state.hazards[hazard.assessment_id] ?? [];

        return {
          hazards: {
            ...state.hazards,
            [hazard.assessment_id]: [...existingHazards, hazard],
          },
        };
      });
    } catch {
      set({ error: "Failed to add hazard." });
    } finally {
      set({ isAdding: false });
    }
  },

  updateHazard: async (id: string, payload: Hazard) => {
    set({ error: null });

    try {
      const response = await updateHazardRequest(id, payload);

      set((state) => {
        const hazard = response.data.data;
        const existing = state.hazards[hazard.assessment_id] ?? [];

        return {
          hazards: {
            ...state.hazards,
            [hazard.assessment_id]: existing.map((h) =>
              h.id === hazard.id ? hazard : h,
            ),
          },
        };
      });
    } catch {
      set({ error: "Failed to update hazard." });
    }
  },

  removeHazard: async (hazardId: string, assessmentId: string) => {
    set((state) => ({
      deletingHazardIds: [...state.deletingHazardIds, hazardId],
      error: null,
    }));

    try {
      await deleteHazard(hazardId);

      set((state) => ({
        hazards: {
          ...state.hazards,
          [assessmentId]: (state.hazards[assessmentId] ?? []).filter(
            (hazard) => hazard.id !== hazardId,
          ),
        },
      }));
    } catch {
      set({ error: "Failed to remove hazard." });
    } finally {
      set((state) => ({
        deletingHazardIds: state.deletingHazardIds.filter(
          (id) => id !== hazardId,
        ),
      }));
    }
  },

  clearhazards: (assessmentId: string) => {
    const current = get().hazards;
    const next = { ...current };
    delete next[assessmentId];

    set({ hazards: next });
  },

  clearError: () => set({ error: null }),
}));