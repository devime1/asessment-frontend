import { create } from "zustand";
import type { Assessment } from "../types/assessment";
import {
  getAssessments,
  getAssessment,
  updateAssessment as updateAssessmentRequest,
} from "../api/assessmentApi";

type AssessmentStore = {
  assessments: Assessment[];
  assessment: Assessment | null;
  isFetchingAll: boolean;
  isFetching: boolean;
  isSaving: boolean;
  error: string | null;

  fetchAssessments: () => Promise<void>;
  fetchAssessment: (id: string) => Promise<void>;
  updateAssessment: (id: string, payload: Partial<Assessment>) => Promise<void>;
  clearCurrentAssessment: () => void;
  clearError: () => void;
};

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  assessments: [],
  assessment: null,
  isFetchingAll: false,
  isFetching: false,
  isSaving: false,
  error: null,

  fetchAssessments: async () => {
    set({ isFetchingAll: true, error: null });

    try {
      const response = await getAssessments();

      set({
        assessments: response.data.data,
      });
    } catch {
      set({ error: "Failed to load assessments." });
    } finally {
      set({ isFetchingAll: false });
    }
  },

  fetchAssessment: async (id: string) => {
    set({ isFetching: true, error: null });

    try {
      const response = await getAssessment(id);

      set({
        assessment: response.data.data,
      });
    } catch {
      set({
        assessment: null,
        error: "Failed to load assessment.",
      });
    } finally {
      set({ isFetching: false });
    }
  },

  updateAssessment: async (id: string, payload: Partial<Assessment>) => {
    set({ isSaving: true, error: null });

    try {
      const response = await updateAssessmentRequest(id, payload);

      set({
        assessment: response.data.data,
      });
    } catch {
      set({ error: "Failed to update assessment." });
    } finally {
      set({ isSaving: false });
    }
  },

  clearCurrentAssessment: () => {
    set({ assessment: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));