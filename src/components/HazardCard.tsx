import type { Hazard } from "../types/hazard";

type Props = {
  hazard: Hazard;
  onRemove: () => void;
  onEdit: () => void;
};

export default function HazardCard({ hazard, onRemove, onEdit }: Props) {
  const riskClass = hazard.risk_level?.toLowerCase() ?? "medium";

  return (
    <article className={`hazard-card ${riskClass}`}>
      <div className="hazard-top">
        <div>
          <h3>{hazard.title}</h3>
          <p className="hazard-description">
            {hazard.description ?? "No description provided."}
          </p>
        </div>

        <span className={`risk-badge ${riskClass}`}>
          {hazard.risk_level ?? "Medium"}
        </span>
      </div>

      <div className="hazard-details">
        <div>
          <span className="label">Severity</span>
          <strong>{hazard.severity ?? "-"}</strong>
        </div>
        <div>
          <span className="label">Likelihood</span>
          <strong>{hazard.likelihood ?? "-"}</strong>
        </div>
        <div>
          <span className="label">Status</span>
          <strong>{hazard.status ?? "Open"}</strong>
        </div>
      </div>

      <div className="hazard-footer">
        <button type="button" className="secondary-button" onClick={onEdit}>
          Edit
        </button>

        <button type="button" className="danger-button" onClick={onRemove}>
          Remove
        </button>
      </div>
    </article>
  );
}
