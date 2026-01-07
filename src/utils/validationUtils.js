/**
 * Validates a single field value against its validation rules
 * @param {Object} field - The field with validation rules
 * @param {any} value - The value to validate
 * @returns {{ isValid: boolean, message?: string }} - Validation result
 */
export function validateField(field, value) {
  if (!field.validations) {
    return { isValid: true };
  }

  const validations = field.validations;
  const errorMessage = validations.errorMessage;

  // Required validation
  if (validations.required) {
    if (value === null || value === undefined || value === "") {
      return {
        isValid: false,
        message: errorMessage || "This field is required",
      };
    }
  }

  // If field is empty and not required, skip other validations
  if (value === null || value === undefined || value === "") {
    return { isValid: true };
  }

  const stringValue = String(value);

  // Min length validation (for text fields)
  if (validations.minLength !== undefined) {
    if (stringValue.length < validations.minLength) {
      return {
        isValid: false,
        message: errorMessage || `Minimum length is ${validations.minLength} characters`,
      };
    }
  }

  // Max length validation (for text fields)
  if (validations.maxLength !== undefined) {
    if (stringValue.length > validations.maxLength) {
      return {
        isValid: false,
        message: errorMessage || `Maximum length is ${validations.maxLength} characters`,
      };
    }
  }

  // Min value validation (for number/date fields)
  if (validations.min !== undefined) {
    const numValue = field.type === "date" ? new Date(value).getTime() : Number(value);
    const minValue = field.type === "date" ? new Date(validations.min).getTime() : Number(validations.min);
    
    if (!isNaN(numValue) && !isNaN(minValue) && numValue < minValue) {
      return {
        isValid: false,
        message: errorMessage || `Minimum value is ${validations.min}`,
      };
    }
  }

  // Max value validation (for number/date fields)
  if (validations.max !== undefined) {
    const numValue = field.type === "date" ? new Date(value).getTime() : Number(value);
    const maxValue = field.type === "date" ? new Date(validations.max).getTime() : Number(validations.max);
    
    if (!isNaN(numValue) && !isNaN(maxValue) && numValue > maxValue) {
      return {
        isValid: false,
        message: errorMessage || `Maximum value is ${validations.max}`,
      };
    }
  }

  // Pattern validation (regex)
  if (validations.pattern) {
    try {
      const regex = new RegExp(validations.pattern);
      if (!regex.test(stringValue)) {
        return {
          isValid: false,
          message: errorMessage || "Invalid format",
        };
      }
    } catch (e) {
      // Invalid regex pattern - skip validation
      console.warn("Invalid regex pattern in field validation:", validations.pattern);
    }
  }

  return { isValid: true };
}

/**
 * Validates all fields in a form
 * @param {Array} fields - Array of fields
 * @param {Object} formValues - Object mapping fieldId to values
 * @returns {Object} - Object mapping fieldId to validation result
 */
export function validateForm(fields, formValues) {
  const errors = {};

  fields.forEach((field) => {
    if (field.type === "section") return;

    const value = formValues[field.id];
    const validation = validateField(field, value);

    if (!validation.isValid) {
      errors[field.id] = validation.message;
    }
  });

  return errors;
}

/**
 * Gets the first field with a validation error
 * @param {Object} errors - Object mapping fieldId to error message
 * @returns {string|null} - First field ID with error, or null
 */
export function getFirstErrorFieldId(errors) {
  const fieldIds = Object.keys(errors);
  return fieldIds.length > 0 ? fieldIds[0] : null;
}

