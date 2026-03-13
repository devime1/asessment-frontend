import type { Assessment } from "../types/assessment";

type Props = {
  assessment: Assessment;
  isActive: boolean;
  onClick: () => void;
};

export default function AssessmentCard({
  assessment,
  isActive,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={`assessment-card ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="assessment-card-content">
        <h3>{assessment.title}</h3>
        <p>
          {assessment.location ?? "Site not set"} • {assessment.date ?? "No date"}
        </p>
      </div>
    </button>
  );
}