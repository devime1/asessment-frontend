import type { Assessment } from "../types/assessment";

type Props = {
  assessment: Assessment;
  onClick: () => void;
};

export default function AssessmentListItem({ assessment, onClick }: Props) {
  return (
    <button type="button" className="assessment-item" onClick={onClick}>
      <div>
        <h3>{assessment.title}</h3>
        <p>
          {assessment.hazards.length ?? 0} Hazards •{" "}
          {assessment.status ?? "Unknown"}
        </p>
      </div>
      <span className="assessment-item-arrow">›</span>
    </button>
  );
}
