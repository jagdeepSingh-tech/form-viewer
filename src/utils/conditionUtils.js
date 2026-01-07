/**
 * Evaluates whether a field should be shown based on its conditions
 * @param {Object} field - The field to evaluate
 * @param {Object} formValues - Current form values (fieldId -> value mapping)
 * @param {Array} allFields - All fields in the form (to find controlling fields)
 * @returns {boolean} - true if field should be shown, false otherwise
 */
export function evaluateConditions(field, formValues, allFields) {
  // If no conditions, always show
  if (!field.conditions || !Array.isArray(field.conditions) || field.conditions.length === 0) {
    return true;
  }

  // All conditions must be met (AND logic)
  return field.conditions.every((condition) => {
    // Resolve fieldLabel to fieldId at runtime
    const controllingField = allFields.find((f) => f.label === condition.fieldLabel);
    if (!controllingField) {
      // If controlling field not found by label, condition fails safely
      return false;
    }

    const fieldValue = formValues[controllingField.id];

    switch (condition.operator) {
      case "equals":
        return String(fieldValue || "") === String(condition.value || "");

      case "not_equals":
        return String(fieldValue || "") !== String(condition.value || "");

      case "greater_than":
        return Number(fieldValue) > Number(condition.value);

      case "less_than":
        return Number(fieldValue) < Number(condition.value);

      case "checked":
        return fieldValue === true || fieldValue === "true";

      case "not_checked":
        return fieldValue !== true && fieldValue !== "true";

      default:
        // Unknown operator, show field by default
        return true;
    }
  });
}

/**
 * Filters fields based on their conditions
 * @param {Array} fields - Array of fields to filter
 * @param {Object} formValues - Current form values
 * @returns {Array} - Filtered array of fields that should be shown
 */
export function filterFieldsByConditions(fields, formValues) {
  return fields.filter((field) => {
    // Section fields are always shown (they don't have conditions)
    if (field.type === "section") {
      return true;
    }

    return evaluateConditions(field, formValues, fields);
  });
}

