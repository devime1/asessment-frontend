import { useState } from "react";
import type { Hazard, RiskLevel } from "../types/hazard";

type Props = {
  assessmentId: string;
  hazard?: Hazard;
  onSubmit: (payload: Partial<Hazard>) => void;
};

type FormErrors = {
  title?: string;
  description?: string;
  risk_level?: string;
  severity?: string;
  likelihood?: string;
};

export default function AddHazardForm({
  assessmentId,
  hazard,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(hazard ? hazard.title : "");
  const [description, setDescription] = useState(
    hazard ? (hazard.description ?? "") : "",
  );
  const [riskLevel, setRiskLevel] = useState(
    hazard ? (hazard.risk_level ?? "Medium") : "Medium",
  );
  const [severity, setSeverity] = useState(
    hazard ? (hazard.severity ?? "") : "",
  );
  const [likelihood, setLikelihood] = useState(
    hazard ? (hazard.likelihood ?? "") : "",
  );
  const [status, setStatus] = useState(
    hazard ? (hazard.status ?? "Open") : "Open",
  );

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedSeverity = severity.trim();
    const trimmedLikelihood = likelihood.trim();

    if (!trimmedTitle) {
      newErrors.title = "Title is required.";
    } else if (trimmedTitle.length > 255) {
      newErrors.title = "Title must not exceed 255 characters.";
    }

    if (
      trimmedDescription.length > 0 &&
      typeof trimmedDescription !== "string"
    ) {
      newErrors.description = "Description must be a string.";
    }

    if (!["Low", "Medium", "High"].includes(riskLevel)) {
      newErrors.risk_level = "Risk level must be Low, Medium, or High.";
    }

    if (trimmedSeverity.length > 50) {
      newErrors.severity = "Severity must not exceed 50 characters.";
    }

    if (trimmedLikelihood.length > 50) {
      newErrors.likelihood = "Likelihood must not exceed 50 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      assessment_id: assessmentId,
      title: title.trim(),
      description: description.trim(),
      risk_level: riskLevel,
      severity: severity.trim(),
      likelihood: likelihood.trim(),
      status,
    });

    setTitle("");
    setDescription("");
    setRiskLevel("Medium");
    setSeverity("");
    setLikelihood("");
    setStatus("Open");
    setErrors({});
  };

  return (
    <section className="section">
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <label className="form-field">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: undefined }));
              }
            }}
            maxLength={255}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </label>

        <label className="form-field">
          <span>Description</span>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: undefined }));
              }
            }}
          />
          {errors.description && (
            <p className="form-error">{errors.description}</p>
          )}
        </label>

        <label className="form-field">
          <span>Risk Level</span>
          <select
            value={riskLevel}
            onChange={(e) => {
              setRiskLevel(e.target.value as RiskLevel);
              if (errors.risk_level) {
                setErrors((prev) => ({ ...prev, risk_level: undefined }));
              }
            }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.risk_level && (
            <p className="form-error">{errors.risk_level}</p>
          )}
        </label>

        <label className="form-field">
          <span>Severity</span>
          <input
            value={severity}
            onChange={(e) => {
              setSeverity(e.target.value);
              if (errors.severity) {
                setErrors((prev) => ({ ...prev, severity: undefined }));
              }
            }}
            maxLength={50}
          />
          {errors.severity && <p className="form-error">{errors.severity}</p>}
        </label>

        <label className="form-field">
          <span>Likelihood</span>
          <input
            value={likelihood}
            onChange={(e) => {
              setLikelihood(e.target.value);
              if (errors.likelihood) {
                setErrors((prev) => ({ ...prev, likelihood: undefined }));
              }
            }}
            maxLength={50}
          />
          {errors.likelihood && (
            <p className="form-error">{errors.likelihood}</p>
          )}
        </label>

        <div className="flex-center">
          <button type="submit" className="primary-button">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
