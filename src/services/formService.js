import { db } from "./firebase";
import { onValue, ref, update, remove } from "firebase/database";

/**
 * Get forms in real-time with optional status filter
 * @param {Function} callback - Called with array of forms
 * @param {string} statusFilter - 'active' | 'archived' | 'all'
 */
export const getFormsRealtime = (callback, statusFilter = 'active') => {
  const formsRef = ref(db, "forms");
  const unsubscribe = onValue(formsRef, (snapshot) => {
    const data = snapshot.val() || {};
    let normalized = Object.entries(data).map(([id, form]) => ({
      id,
      ...form,
    }));

    // Filter by status
    if (statusFilter !== 'all') {
      normalized = normalized.filter(form => {
        // Backward compatibility: forms without status are treated as active
        const formStatus = form.status || 'active';
        return formStatus === statusFilter;
      });
    }

    callback(normalized);
  });

  return unsubscribe;
};

/**
 * Update form data
 */
export const updateForm = (id, data) => {
  if (!id) return Promise.reject(new Error("Form id is required"));
  const formRef = ref(db, `forms/${id}`);
  return update(formRef, {
    ...data,
    updatedAt: Date.now()
  });
};

/**
 * Archive a form (soft delete)
 * @param {string} id - Form ID
 */
export const archiveForm = (id) => {
  if (!id) return Promise.reject(new Error("Form id is required"));
  const formRef = ref(db, `forms/${id}`);
  return update(formRef, {
    status: 'archived',
    archivedAt: Date.now(),
    updatedAt: Date.now()
  });
};

/**
 * Restore an archived form
 * @param {string} id - Form ID
 */
export const restoreForm = (id) => {
  if (!id) return Promise.reject(new Error("Form id is required"));
  const formRef = ref(db, `forms/${id}`);
  return update(formRef, {
    status: 'active',
    archivedAt: null,
    updatedAt: Date.now()
  });
};

/**
 * Permanently delete a form
 * WARNING: This action cannot be undone
 * @param {string} id - Form ID
 */
export const permanentDeleteForm = (id) => {
  if (!id) return Promise.reject(new Error("Form id is required"));
  const formRef = ref(db, `forms/${id}`);
  return remove(formRef);
};

export default {
  getFormsRealtime,
  updateForm,
  archiveForm,
  restoreForm,
  permanentDeleteForm,
};
