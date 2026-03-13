import { useState } from "react";
import type { Assessment } from "../types/assessment";

type Props = {
  assessment: Assessment | null;
  onSubmit: (payload: Partial<Assessment>) => void;
};

type FormErrors = {
  title?: string;
  status?: string;
  review_date?: string;
  notes?: string;
};

export default function AssessmentMetaForm({ assessment, onSubmit }: Props) {
  const [title, setTitle] = useState(assessment ? assessment.title : "");
  const [status, setStatus] = useState(assessment ? assessment.status : "");
  const [review_date, setReviewDate] = useState(
    assessment ? assessment.review_date ?? "" : "",
  );
  const [notes, setNotes] = useState(assessment ? assessment.notes ?? "" : "");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};

    const trimmedTitle = title.trim();
    const trimmedStatus = status.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedTitle) {
      newErrors.title = "Title is required.";
    } else if (trimmedTitle.length > 255) {
      newErrors.title = "Title must not exceed 255 characters.";
    }

    if (!trimmedStatus) {
      newErrors.status = "Status is required.";
    } else if (trimmedStatus.length > 50) {
      newErrors.status = "Status must not exceed 50 characters.";
    }

    if (review_date) {
      const isValidDate = !Number.isNaN(Date.parse(review_date));
      if (!isValidDate) {
        newErrors.review_date = "Review date must be a valid date.";
      }
    }

    if (typeof trimmedNotes !== "string") {
      newErrors.notes = "Notes must be a string.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!assessment) return;
    if (!validate()) return;

    onSubmit({
      id: assessment.id,
      title: title.trim(),
      status: status.trim(),
      review_date: review_date || null,
      notes: notes.trim(),
    });

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
          <span>Status</span>
          <input
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              if (errors.status) {
                setErrors((prev) => ({ ...prev, status: undefined }));
              }
            }}
            maxLength={50}
          />
          {errors.status && <p className="form-error">{errors.status}</p>}
        </label>

        <label className="form-field">
          <span>Review Date</span>
          <input
            type="date"
            value={review_date}
            onChange={(e) => {
              setReviewDate(e.target.value);
              if (errors.review_date) {
                setErrors((prev) => ({ ...prev, review_date: undefined }));
              }
            }}
          />
          {errors.review_date && (
            <p className="form-error">{errors.review_date}</p>
          )}
        </label>

        <label className="form-field">
          <span>Notes</span>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (errors.notes) {
                setErrors((prev) => ({ ...prev, notes: undefined }));
              }
            }}
          />
          {errors.notes && <p className="form-error">{errors.notes}</p>}
        </label>

        <button type="submit" className="primary-button">
          Save
        </button>
      </form>
    </section>
  );
}