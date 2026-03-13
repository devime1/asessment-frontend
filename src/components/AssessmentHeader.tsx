import type { Assessment } from "../types/assessment";
import { useState } from "react";
import { useAssessmentStore } from "../stores/useAssessmentStore";

import Modal from "../components/Modal";
import AssessmentForm from "../components/AssessmentForm";

type Props = {
  assessment: Assessment | null;
  isLoading?: boolean;
};

export default function AssessmentHeader({
  assessment,
  isLoading = false,
}: Props) {
  const [isAssessmentOpen, setisAssessmentOpen] = useState(false);

  const updateAssessment = useAssessmentStore((s) => s.updateAssessment);

  const handleUpdateAssessment = (payload: Partial<Assessment>) => {
    if (!assessment) {
      return;
    }

    updateAssessment(assessment.id, payload);
    setisAssessmentOpen(false);
  };

  if (isLoading) {
    return (
      <header className="assessment-header">
        <p className="header-title">Assessment Summary</p>
        <h1>Loading assessment...</h1>
      </header>
    );
  }

  return (
    <header className="assessment-header">
      <div className="stack-between">
        <div className="header-title">Assessment Summary</div>
        <button
          className="primary-button"
          onClick={() => setisAssessmentOpen(true)}
        >
          Edit
        </button>
      </div>

      <h1>{assessment?.title ?? "Untitled Assessment"}</h1>
      <p className="description">{assessment?.status ?? ""}</p>
      <small>{assessment?.notes ?? ""}</small>
      <Modal
        isOpen={isAssessmentOpen}
        title="Edit Assessment"
        onClose={() => setisAssessmentOpen(false)}
      >
        <AssessmentForm
          assessment={assessment}
          onSubmit={handleUpdateAssessment}
        />
      </Modal>
    </header>
  );
}
