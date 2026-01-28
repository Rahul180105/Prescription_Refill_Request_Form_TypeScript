import React, { useEffect, useState, type ReactElement } from "react";
import Patient from "./sections/patient";
import Medication from "./sections/medication";
import Reason from "./sections/reason";
import Delivery from "./sections/delivery";
import Confirm from "./sections/confirm";
import { buildPayload } from "../../helpers/build-payload";
import { recordToForm } from "../../record-to-form";
import type { RefillFormState } from "../../types/refill-formstate";
import { initialFormState } from "../../states/initial-formstate";
import type { RefillRecord } from "../../types/refill-record";
import { saveRecords } from "../../storage";
import type { FormErrors } from "../../types";



interface FormProps {
  setRecords: React.Dispatch<React.SetStateAction<RefillRecord[]>>;
  records: RefillRecord[];
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export function Form({
  setRecords,
  records,
  editingIndex,
  setEditingIndex
}: FormProps): ReactElement {

  const [form, setForm] = useState<RefillFormState>(initialFormState);

  /* ---------- Load record into form when editing ---------- */
  useEffect(() => {
    if (editingIndex !== null) {
      setForm(recordToForm(records[editingIndex]));
    }
  }, [editingIndex, records]);

  /* ---------- Save / Update record ---------- */
  function saveRecord(payload: RefillRecord) {
    setRecords(prev => {
      let updated: RefillRecord[];

      if (editingIndex === null) {
        // CREATE
        updated = [...prev, payload];
      } else {
        // UPDATE
        updated = prev.map((rec, i) =>
          i === editingIndex ? payload : rec
        );
      }

      saveRecords(updated);
      return updated;
    });

    // exit edit mode
    setEditingIndex(null);
  }

  /* ---------- Submit handler ---------- */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = buildPayload(form);
    saveRecord(payload);

    setForm(initialFormState);
  }

  return (
    
      <div className="form" id="formContainer">
        <form id="refill" onSubmit={handleSubmit}>
          <label>
            <strong>REFILL FORM</strong>
          </label>

          <Patient form={form} setForm={setForm} />
          <Medication form={form} setForm={setForm} />
          <Reason form={form} setForm={setForm} />
          <Delivery form={form} setForm={setForm} />
          <Confirm form={form} setForm={setForm} />

          <button type="submit">
            {editingIndex === null ? "Submit" : "Update"}
          </button>
        </form>
      </div>
  );
}

export default Form;