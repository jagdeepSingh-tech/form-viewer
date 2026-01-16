import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import FormList from "./components/FormList/FormList";
import FormPreview from "./components/FormPreview/FormPreview";
import EmptyState from "./components/EmptyState/EmptyState";
import { applyTheme } from "./theme/theme";
import { getFormsRealtime, updateForm } from "./services/formService";
import "./root.component.css";

export default function Root() {
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    applyTheme();

    const handler = (e) => {
      document.documentElement.setAttribute("data-theme", e.detail);
    };
    window.addEventListener("theme-change", handler);
    return () => window.removeEventListener("theme-change", handler);
  }, []);

  useEffect(() => {
    const unsubscribe = getFormsRealtime((incomingForms) => {
      setForms(incomingForms);
      setSelectedFormId((currentId) => {
        if (!incomingForms.length) return null;
        if (currentId && incomingForms.some((form) => form.id === currentId)) {
          return currentId;
        }
        return incomingForms[0].id;
      });
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  const selectedForm = useMemo(
    () => forms.find((form) => form.id === selectedFormId) || null,
    [forms, selectedFormId],
  );

  const handleSelectForm = (formId) => {
    setSelectedFormId(formId);
    setEditMode(false);
    setErrorMessage(null);
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    if (!selectedForm) return;
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await updateForm(selectedForm.id, { ...selectedForm });
      setEditMode(false);
    } catch (error) {
      setErrorMessage("Unable to save changes. Please retry.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <FormList forms={forms} selectedFormId={selectedFormId} onSelect={handleSelectForm} />
        <section className="app-preview">
          {selectedForm ? (
            <>
              {errorMessage && <div className="app-banner app-banner--error">{errorMessage}</div>}
              <FormPreview
                form={selectedForm}
                onEdit={handleEditToggle}
                onSave={handleSave}
                editMode={editMode}
                isSaving={isSaving}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
    </div>
  );
}
