import type { Assessment } from "../types/assessment";
import { api } from "./client";

export const getAssessment = (id: string) => {
  return api.get(`/assessments/${id}`);
};

export const getAssessments = () => {
  return api.get("/assessments");
};

export const updateAssessment = (id: string, payload: Partial<Assessment>) => {
  return api.put(`/assessments/${id}`, payload);
};

export const createAssessment = (payload: Partial<Assessment>) => {
  return api.post("/assessments", payload);
};
