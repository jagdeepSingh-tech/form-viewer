import React, { useState } from "react";

// Mock data - forms with fields and responses
const MOCK_FORMS = [
  {
    id: 1,
    title: "Customer Feedback Survey",
    description: "Collect feedback from customers about their experience with our product",
    createdDate: "2024-01-15",
    fields: [
      {
        id: "f1",
        type: "text",
        label: "Customer Name",
        required: true,
        response: "John Smith",
      },
      {
        id: "f2",
        type: "email",
        label: "Email Address",
        required: true,
        response: "john.smith@example.com",
      },
      {
        id: "f3",
        type: "select",
        label: "Overall Satisfaction",
        required: true,
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
        response: "Very Satisfied",
      },
      {
        id: "f4",
        type: "textarea",
        label: "Additional Comments",
        required: false,
        response: "Great product! The interface is intuitive and the features are exactly what I needed.",
      },
      {
        id: "f5",
        type: "number",
        label: "Rating (1-10)",
        required: true,
        response: "9",
      },
    ],
  },
  {
    id: 2,
    title: "Job Application Form",
    description: "Standard application form for job candidates",
    createdDate: "2024-01-20",
    fields: [
      {
        id: "f1",
        type: "text",
        label: "Full Name",
        required: true,
        response: "Sarah Johnson",
      },
      {
        id: "f2",
        type: "email",
        label: "Email",
        required: true,
        response: "sarah.j@example.com",
      },
      {
        id: "f3",
        type: "text",
        label: "Phone Number",
        required: true,
        response: "+1 (555) 123-4567",
      },
      {
        id: "f4",
        type: "select",
        label: "Position Applied For",
        required: true,
        options: ["Software Engineer", "Product Manager", "Designer", "Marketing Manager"],
        response: "Software Engineer",
      },
      {
        id: "f5",
        type: "textarea",
        label: "Cover Letter",
        required: false,
        response: "I am excited to apply for the Software Engineer position. With 5 years of experience in full-stack development, I believe I would be a great fit for your team.",
      },
      {
        id: "f6",
        type: "date",
        label: "Available Start Date",
        required: true,
        response: "2024-03-01",
      },
      {
        id: "f7",
        type: "radio",
        label: "Work Authorization",
        required: true,
        options: ["US Citizen", "Permanent Resident", "Work Visa", "Other"],
        response: "US Citizen",
      },
    ],
  },
  {
    id: 3,
    title: "Event Registration",
    description: "Registration form for upcoming tech conference",
    createdDate: "2024-02-01",
    fields: [
      {
        id: "f1",
        type: "text",
        label: "Attendee Name",
        required: true,
        response: "Michael Chen",
      },
      {
        id: "f2",
        type: "email",
        label: "Email",
        required: true,
        response: "michael.chen@example.com",
      },
      {
        id: "f3",
        type: "select",
        label: "Ticket Type",
        required: true,
        options: ["Early Bird", "Regular", "VIP", "Student"],
        response: "Regular",
      },
      {
        id: "f4",
        type: "checkbox",
        label: "Dietary Requirements",
        required: false,
        options: ["Vegetarian", "Vegan", "Gluten-Free", "No Restrictions"],
        response: ["Vegetarian", "Gluten-Free"],
      },
      {
        id: "f5",
        type: "textarea",
        label: "Special Requests",
        required: false,
        response: "I would like to request a seat near the front for better visibility.",
      },
    ],
  },
  {
    id: 4,
    title: "Contact Us Form",
    description: "General contact form for customer inquiries",
    createdDate: "2024-02-10",
    fields: [
      {
        id: "f1",
        type: "text",
        label: "Name",
        required: true,
        response: "Emily Rodriguez",
      },
      {
        id: "f2",
        type: "email",
        label: "Email",
        required: true,
        response: "emily.r@example.com",
      },
      {
        id: "f3",
        type: "select",
        label: "Inquiry Type",
        required: true,
        options: ["General Question", "Technical Support", "Sales", "Partnership", "Other"],
        response: "Technical Support",
      },
      {
        id: "f4",
        type: "textarea",
        label: "Message",
        required: true,
        response: "I'm experiencing an issue with the login functionality. The page keeps refreshing when I try to sign in.",
      },
    ],
  },
];

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8f9fa",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  formsList: {
    width: "360px",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "2px 0 8px rgba(0, 0, 0, 0.04)",
  },
  formsListHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
    background: "#ffffff",
  },
  formsListTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 0.25rem 0",
  },
  formsListSubtitle: {
    fontSize: "0.875rem",
    color: "#6b7280",
    margin: 0,
  },
  formsListContent: {
    flex: 1,
    overflowY: "auto",
    padding: "0.5rem",
  },
  formItem: {
    padding: "1rem",
    marginBottom: "0.5rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid transparent",
    background: "#ffffff",
  },
  formItemHover: {
    background: "#f9fafb",
    borderColor: "#e5e7eb",
  },
  formItemSelected: {
    background: "#f0f4ff",
    borderColor: "#667eea",
    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.15)",
  },
  formItemTitle: {
    fontSize: "0.9375rem",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 0.5rem 0",
  },
  formItemDescription: {
    fontSize: "0.8125rem",
    color: "#6b7280",
    margin: "0 0 0.5rem 0",
    lineHeight: "1.5",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  formItemDate: {
    fontSize: "0.75rem",
    color: "#9ca3af",
    margin: 0,
  },
  previewPanel: {
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
    background: "#ffffff",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#9ca3af",
    textAlign: "center",
  },
  emptyStateIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: "1.125rem",
    margin: 0,
    fontWeight: "500",
  },
  formPreview: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  formHeader: {
    marginBottom: "2rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
  },
  formTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 0.5rem 0",
  },
  formDescription: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: "0 0 0.75rem 0",
    lineHeight: "1.6",
  },
  formMeta: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    margin: 0,
  },
  formFields: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  fieldContainer: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "1.5rem",
  },
  fieldLabel: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.75rem",
  },
  fieldLabelRequired: {
    color: "#dc2626",
  },
  fieldValue: {
    fontSize: "0.9375rem",
    color: "#1a1a1a",
    lineHeight: "1.6",
    padding: "0.75rem",
    background: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    minHeight: "2.5rem",
    display: "flex",
    alignItems: "center",
  },
  fieldValueTextarea: {
    minHeight: "100px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  fieldValueSelect: {
    background: "#f9fafb",
  },
  fieldValueCheckbox: {
    background: "transparent",
    border: "none",
    padding: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  checkboxOption: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9375rem",
    color: "#1a1a1a",
  },
  checkboxChecked: {
    color: "#667eea",
    fontWeight: "500",
  },
  radioOption: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9375rem",
    color: "#1a1a1a",
    marginBottom: "0.5rem",
  },
  radioSelected: {
    color: "#667eea",
    fontWeight: "500",
  },
};

function FormItem({ form, isSelected, onClick, onMouseEnter, onMouseLeave, isHovered }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        ...styles.formItem,
        ...(isSelected ? styles.formItemSelected : {}),
        ...(isHovered && !isSelected ? styles.formItemHover : {}),
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3 style={styles.formItemTitle}>{form.title}</h3>
      <p style={styles.formItemDescription}>{form.description}</p>
      <p style={styles.formItemDate}>Created {formatDate(form.createdDate)}</p>
    </div>
  );
}

function FormPreview({ form }) {
  if (!form) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyStateIcon}>📋</div>
        <p style={styles.emptyStateText}>Select a form to preview its structure and responses</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderFieldValue = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
        return (
          <div style={styles.fieldValue}>{field.response || "—"}</div>
        );
      case "textarea":
        return (
          <div style={{ ...styles.fieldValue, ...styles.fieldValueTextarea }}>
            {field.response || "—"}
          </div>
        );
      case "select":
        return (
          <div style={{ ...styles.fieldValue, ...styles.fieldValueSelect }}>
            {field.response || "—"}
          </div>
        );
      case "checkbox":
        return (
          <div style={{ ...styles.fieldValue, ...styles.fieldValueCheckbox }}>
            {field.options.map((option, idx) => {
              const isChecked = Array.isArray(field.response)
                ? field.response.includes(option)
                : false;
              return (
                <div
                  key={idx}
                  style={{
                    ...styles.checkboxOption,
                    ...(isChecked ? styles.checkboxChecked : {}),
                  }}
                >
                  <span>{isChecked ? "☑" : "☐"}</span>
                  <span>{option}</span>
                </div>
              );
            })}
          </div>
        );
      case "radio":
        return (
          <div style={styles.fieldValue}>
            {field.options.map((option, idx) => {
              const isSelected = field.response === option;
              return (
                <div
                  key={idx}
                  style={{
                    ...styles.radioOption,
                    ...(isSelected ? styles.radioSelected : {}),
                  }}
                >
                  <span>{isSelected ? "◉" : "○"}</span>
                  <span>{option}</span>
                </div>
              );
            })}
          </div>
        );
      default:
        return <div style={styles.fieldValue}>—</div>;
    }
  };

  return (
    <div style={styles.formPreview}>
      <div style={styles.formHeader}>
        <h1 style={styles.formTitle}>{form.title}</h1>
        <p style={styles.formDescription}>{form.description}</p>
        <p style={styles.formMeta}>Created on {formatDate(form.createdDate)}</p>
      </div>

      <div style={styles.formFields}>
        {form.fields.map((field) => (
          <div key={field.id} style={styles.fieldContainer}>
            <label
              style={{
                ...styles.fieldLabel,
                ...(field.required ? styles.fieldLabelRequired : {}),
              }}
            >
              {field.label}
              {field.required && " *"}
            </label>
            {renderFieldValue(field)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Root(props) {
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [hoveredFormId, setHoveredFormId] = useState(null);

  const selectedForm = MOCK_FORMS.find((form) => form.id === selectedFormId);

  const handleFormSelect = (formId) => {
    setSelectedFormId(formId);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formsList}>
        <div style={styles.formsListHeader}>
          <h2 style={styles.formsListTitle}>Forms</h2>
          <p style={styles.formsListSubtitle}>{MOCK_FORMS.length} forms available</p>
        </div>
        <div style={styles.formsListContent}>
          {MOCK_FORMS.map((form) => (
            <FormItem
              key={form.id}
              form={form}
              isSelected={selectedFormId === form.id}
              onClick={() => handleFormSelect(form.id)}
              onMouseEnter={() => setHoveredFormId(form.id)}
              onMouseLeave={() => setHoveredFormId(null)}
              isHovered={hoveredFormId === form.id}
            />
          ))}
        </div>
      </div>

      <div style={styles.previewPanel}>
        <FormPreview form={selectedForm} />
      </div>
    </div>
  );
}
