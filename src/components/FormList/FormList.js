import React, { useState, useEffect, useRef } from "react";
import "./FormList.css";
import { archiveForm, restoreForm, permanentDeleteForm } from "../../services/formService";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function FormListItem({ form, isActive, onSelect, status, onAction, isOpen, onToggleMenu }) {
  const handleAction = (e, action) => {
    e.stopPropagation();
    onAction(action, form);
  };

  return (
    <div
      className={`form-list-item-wrapper${isActive ? " is-active" : ""}`}
      data-form-id={form.id}
    >
      <button
        type="button"
        className="form-list-item"
        onClick={() => onSelect(form.id)}
      >
        <div className="form-list-item__row">
          <div className="form-list-item__title">{form.title}</div>
          <div
            className="form-list-item__actions-trigger"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMenu(form.id);
            }}
            title="Form actions"
          >
            ⋯
          </div>
        </div>
        <div className="form-list-item__row">
          <p className="form-list-item__description">{form.description || "No description"}</p>
          <span className="form-list-item__tag">
            {Array.isArray(form.fields) ? `${form.fields.length} fields` : "0 fields"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="form-list-item__menu">
          {status === 'active' ? (
            <button
              className="form-list-item__menu-item"
              onClick={(e) => handleAction(e, 'archive')}
            >
              Archive
            </button>
          ) : (
            <>
              <button
                className="form-list-item__menu-item"
                onClick={(e) => handleAction(e, 'restore')}
              >
                Restore
              </button>
              <button
                className="form-list-item__menu-item form-list-item__menu-item--danger"
                onClick={(e) => handleAction(e, 'delete')}
              >
                Delete Permanently
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function FormList({ forms, selectedFormId, onSelect, status, showToast }) {
  const [modalConfig, setModalConfig] = useState({ isOpen: false });
  const [openMenuId, setOpenMenuId] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (openMenuId && !e.target.closest(".form-list-item__actions-trigger") && !e.target.closest(".form-list-item__menu")) {
        setOpenMenuId(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenMenuId(null);
      }
    };

    const handleScroll = () => {
      if (openMenuId) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleGlobalClick);
      document.addEventListener("keydown", handleKeyDown);
      const itemsContainer = listRef.current;
      if (itemsContainer) {
        itemsContainer.addEventListener("scroll", handleScroll);
      }

      return () => {
        document.removeEventListener("mousedown", handleGlobalClick);
        document.removeEventListener("keydown", handleKeyDown);
        if (itemsContainer) {
          itemsContainer.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [openMenuId]);

  const handleAction = async (action, form) => {
    setOpenMenuId(null); // Close menu immediately on action

    try {
      if (action === 'archive') {
        // Optimized: Instant archive with Undo toast
        await archiveForm(form.id);
        showToast(
          "Form archived",
          "Undo",
          () => restoreForm(form.id)
        );
      } else if (action === 'restore') {
        await restoreForm(form.id);
        showToast("Form restored");
      } else if (action === 'delete') {
        // Keep strong confirmation for permanent delete
        setModalConfig({
          isOpen: true,
          title: "Permanently Delete Form?",
          message: `This action cannot be undone. The form "${form.title}" and all its configuration will be permanently deleted.`,
          confirmText: "Delete Forever",
          isDangerous: true,
          requiresTyping: true,
          typingConfirmText: form.title,
          onConfirm: async () => {
            await permanentDeleteForm(form.id);
            showToast("Form permanently deleted");
          }
        });
      }
    } catch (error) {
      console.error(`Failed to ${action} form:`, error);
      showToast(`Error: ${action} failed`);
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(prev => prev === id ? null : id);
  };

  return (
    <div className="form-list">
      <div className="form-list__header">
        <div>
          <p className="form-list__eyebrow">Workspace</p>
          <h2 className="form-list__title">
            {status === 'active' ? 'Active Forms' : 'Archived Forms'}
          </h2>
          <p className="form-list__subtitle">
            {forms.length ? `${forms.length} available` : "No forms found"}
          </p>
        </div>
      </div>

      <div className="form-list__items" ref={listRef}>
        {forms.length > 0 ? (
          forms.map((form) => (
            <FormListItem
              key={form.id}
              form={form}
              isActive={selectedFormId === form.id}
              onSelect={onSelect}
              status={status}
              onAction={handleAction}
              isOpen={openMenuId === form.id}
              onToggleMenu={toggleMenu}
            />
          ))
        ) : (
          <div className="form-list-empty">
            <p>No {status === 'active' ? 'active' : 'archived'} forms found.</p>
          </div>
        )}
      </div>

      <ConfirmationModal
        {...modalConfig}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}

