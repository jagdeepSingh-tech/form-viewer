import React, { useMemo } from "react";
import { navigateToUrl } from "single-spa";
import AccordionSection from "../AccordionSection/AccordionSection";
import { groupFieldsBySection } from "../../utils/sectionUtils";
import { filterFieldsByConditions } from "../../utils/conditionUtils";
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
      return <div className={baseClass}>{field.placeholder || "—"}</div>;
    case "textarea":
      return (
        <div className={`${baseClass} ${baseClass}--textarea`}>
          {field.placeholder || "—"}
        </div>
      );
    case "select":
      return <div className={`${baseClass} ${baseClass}--select`}>{field.placeholder || "Select option"}</div>;
    case "checkbox":
      return (
        <div className={`${baseClass} ${baseClass}--checkbox`}>
          {(field.options || []).map((option) => (
            <div key={option} className="field-checkbox">
              <span className="field-checkbox__icon">☐</span>
              <span>{option}</span>
            </div>
          ))}
        </div>
      );
    case "radio":
      return (
        <div className={baseClass}>
          {(field.options || []).map((option) => (
            <div key={option} className="field-radio">
              <span className="field-radio__icon">○</span>
              <span>{option}</span>
            </div>
          ))}
        </div>
      );
    default:
      return <div className={baseClass}>—</div>;
  }
};

export default function FormPreview({ form, onSave, isSaving }) {
  // For preview mode, we show all fields (no form values to evaluate)
  // In a real form-filling scenario, you'd pass formValues here
  const formValues = {};

  const sections = useMemo(() => {
    if (!form || !form.fields) return [];
    
    // Filter fields based on conditions
    // In preview mode with no values, fields with conditions won't show
    // In actual form filling, formValues would be populated
    const visibleFields = filterFieldsByConditions(form.fields, formValues);
    
    return groupFieldsBySection(visibleFields);
  }, [form, formValues]);

  if (!form) return null;

  const handleEditClick = () => {
    // Navigate to form-builder with formId only
    // This allows the builder to fetch the latest data from Firebase
    window.history.pushState({ formId: form.id }, "", "/form-builder");
    navigateToUrl("/form-builder");
  };

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
          <button type="button" className="edit-button" onClick={handleEditClick}>
            Edit Form
          </button>
        </div>
      </div>

      <div className="form-preview__fields">
        {sections.map((section, index) => (
          <AccordionSection
            key={index}
            title={section.title}
            defaultExpanded={index === 0}
          >
            {section.fields.map((field) => (
              <div key={field.id || field.label} className="field-card">
                <div className="field-card__label">
                  <span>{field.label}</span>
                  {field.required && <span className="field-card__required">Required</span>}
                </div>
                <p className="field-card__type">{field.type}</p>
                <FieldValue field={field} />
              </div>
            ))}
          </AccordionSection>
        ))}
      </div>
    </div>
  );
}

