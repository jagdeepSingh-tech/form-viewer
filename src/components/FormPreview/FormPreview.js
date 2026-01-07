import React from "react";
import "./FormPreview.css";

const formatDateLong = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const FieldValue = ({ field }) => {
  if (!field) return null;

  const baseClass = "field-value";

  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return <div className={baseClass}>{field.response || "—"}</div>;
    case "textarea":
      return (
        <div className={`${baseClass} ${baseClass}--textarea`}>
          {field.response || "—"}
        </div>
      );
    case "select":
      return <div className={`${baseClass} ${baseClass}--select`}>{field.response || "—"}</div>;
    case "checkbox":
      return (
        <div className={`${baseClass} ${baseClass}--checkbox`}>
          {(field.options || []).map((option) => {
            const isChecked = Array.isArray(field.response) && field.response.includes(option);
            return (
              <div
                key={option}
                className={`field-checkbox${isChecked ? " is-checked" : ""}`}
              >
                <span className="field-checkbox__icon">{isChecked ? "☑" : "☐"}</span>
                <span>{option}</span>
              </div>
            );
          })}
        </div>
      );
    case "radio":
      return (
        <div className={baseClass}>
          {(field.options || []).map((option) => {
            const isSelected = field.response === option;
            return (
              <div key={option} className={`field-radio${isSelected ? " is-selected" : ""}`}>
                <span className="field-radio__icon">{isSelected ? "◉" : "○"}</span>
                <span>{option}</span>
              </div>
            );
          })}
        </div>
      );
    default:
      return <div className={baseClass}>—</div>;
  }
};

export default function FormPreview({ form, onEdit, onSave, editMode, isSaving }) {
  if (!form) return null;

  return (
    <div className="form-preview">
      <div className="form-preview__header">
        <div>
          <p className="form-preview__eyebrow">Form</p>
          <h1 className="form-preview__title">{form.title}</h1>
          <p className="form-preview__description">{form.description}</p>
          <p className="form-preview__meta">
            Created {formatDateLong(form.createdAt || form.createdDate)} ·{" "}
            {Array.isArray(form.fields) ? `${form.fields.length} fields` : "0 fields"}
          </p>
        </div>
        <div className="form-preview__actions">
          <button type="button" className="btn btn--ghost" onClick={onEdit}>
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="form-preview__fields">
        {(form.fields || []).map((field) => (
          <div key={field.id || field.label} className="field-card">
            <div className="field-card__label">
              <span>{field.label}</span>
              {field.required && <span className="field-card__required">Required</span>}
            </div>
            <p className="field-card__type">{field.type}</p>
            <FieldValue field={field} />
          </div>
        ))}
      </div>
    </div>
  );
}

