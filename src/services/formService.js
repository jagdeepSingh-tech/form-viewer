import { db } from "./firebase";
import { onValue, ref, update } from "firebase/database";

export const getFormsRealtime = (callback) => {
  const formsRef = ref(db, "forms");
  const unsubscribe = onValue(formsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const normalized = Object.entries(data).map(([id, form]) => ({
      id,
      ...form,
    }));
    callback(normalized);
  });

  return unsubscribe;
};

export const updateForm = (id, data) => {
  if (!id) return Promise.reject(new Error("Form id is required"));
  const formRef = ref(db, `forms/${id}`);
  return update(formRef, data);
};

export default {
  getFormsRealtime,
  updateForm,
};

