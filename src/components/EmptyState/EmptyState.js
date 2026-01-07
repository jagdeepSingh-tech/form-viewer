import React from "react";
import "./EmptyState.css";

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">📄</div>
      <h2 className="empty-state__title">No form selected</h2>
      <p className="empty-state__subtitle">
        Choose a form from the left panel to inspect its structure and responses.
      </p>
    </div>
  );
}

