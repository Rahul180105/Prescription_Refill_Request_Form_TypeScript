import { useEffect, useState, type ReactElement } from "react";
import { Patient, Delivery, Medication, Reason, Confirm } from "./sections";
import { buildPayload } from "../../helpers/build-payload";
import { recordToForm } from "../../helpers/record-to-form";
import { validateForm } from "../../validations/validate-form";
import { saveRecords } from "../../data/storage";
import type { RefillFormState } from "../../types/refill-formstate";
import type { RefillRecord } from "../../types/refill-record";
import type { FormErrors } from "../../types";
import { initialFormState } from "../../states/initial-formstate";
import { SuccessModal } from "../ui/sucess-modal";

interface FormProps {
  records: RefillRecord[];
  setRecords: React.Dispatch<React.SetStateAction<RefillRecord[]>>;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onSuccess?: () => void; 
}

export function Form({
  records,
  setRecords,
  editingIndex,
  setEditingIndex,
  onSuccess,
}: FormProps): ReactElement {
  const [form, setForm] = useState<RefillFormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);


  useEffect(() => {
    if (editingIndex !== null) {
      setForm(recordToForm(records[editingIndex]));
      setErrors({});
    }
  }, [editingIndex, records]);

  function saveRecord(payload: RefillRecord) {
    setRecords(prev => {
      const updated =
        editingIndex === null
          ? [...prev, payload]
          : prev.map((r, i) => (i === editingIndex ? payload : r));

      saveRecords(updated);
      return updated;
    });

    setEditingIndex(null);
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = validateForm(form);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const payload = buildPayload(form);

    saveRecord(payload);
    setForm(initialFormState);
    setShowSuccess(true);
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    onSuccess?.(); 
  }

  return (
    <>
      <div className="form" id="formContainer">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-lg font-semibold text-center">
            {editingIndex === null ? "Refill Form" : "Update Refill"}
          </h2>

          <Patient form={form} setForm={setForm} errors={errors} />
          <Medication form={form} setForm={setForm} errors={errors} />
          <Reason form={form} setForm={setForm} errors={errors} />
          <Delivery form={form} setForm={setForm} errors={errors} />
          <Confirm form={form} setForm={setForm} errors={errors} />

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {editingIndex === null ? "Submit" : "Update"}
          </button>
        </form>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={handleSuccessClose}
        title={editingIndex === null ? "Saved!" : "Updated!"}
        message="Refill record saved successfully."
      />
    </>
  );
}

export default Form;