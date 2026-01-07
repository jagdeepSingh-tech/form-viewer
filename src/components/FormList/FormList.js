import React from "react";
import "./FormList.css";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function FormListItem({ form, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`form-list-item${isActive ? " is-active" : ""}`}
      onClick={() => onSelect(form.id)}
    >
      <div className="form-list-item__meta">
        <div className="form-list-item__title">{form.title}</div>
        <div className="form-list-item__date">
          Updated {formatDate(form.updatedAt || form.createdAt || form.createdDate)}
        </div>
      </div>
      <p className="form-list-item__description">{form.description || "Form without description"}</p>
      <div className="form-list-item__footer">
        <span className="form-list-item__tag">
          {Array.isArray(form.fields) ? `${form.fields.length} fields` : "0 fields"}
        </span>
        <span className="form-list-item__chevron">→</span>
      </div>
    </button>
  );
}

export default function FormList({ forms, selectedFormId, onSelect }) {
  return (
    <div className="form-list">
      <div className="form-list__header">
        <div>
          <p className="form-list__eyebrow">Workspace</p>
          <h2 className="form-list__title">Forms</h2>
          <p className="form-list__subtitle">
            {forms.length ? `${forms.length} available` : "No forms yet"}
          </p>
        </div>
      </div>

      <div className="form-list__items">
        {forms.map((form) => (
          <FormListItem
            key={form.id}
            form={form}
            isActive={selectedFormId === form.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

