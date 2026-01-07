import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">Forms</p>
        <h1 className="app-header__title">Form Viewer</h1>
        <p className="app-header__subtitle">
          Monitor published forms, review structure, and keep data in sync.
        </p>
      </div>
    </header>
  );
}

