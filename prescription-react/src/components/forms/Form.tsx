import React, { useEffect, useState, type ReactElement } from "react";
import { Patient,Delivery,Medication,Reason,Confirm} from './sections';
import { buildPayload } from "../../helpers/build-payload";
import { recordToForm } from "../../record-to-form";
import { validateForm } from "../../validations/validate-form";
import { saveRecords } from "../../storage";
import type { RefillFormState } from "../../types/refill-formstate";
import type { RefillRecord } from "../../types/refill-record";
import type { FormErrors } from "../../types";
import { initialFormState } from "../../states/initial-formstate";


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
  const [errors, setErrors] = useState<FormErrors>({});


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
          : prev.map((rec, i) =>
              i === editingIndex ? payload : rec
            );

      saveRecords(updated);
      return updated;
    });

    setEditingIndex(null);
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('submit');
    const result = validateForm(form);
     console.log(result.valid)
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
   

    setErrors({});
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

        <Patient
          form={form}
          setForm={setForm}
          errors={errors}
        />

        <Medication
          form={form}
          setForm={setForm}
          errors={errors}
        />

        <Reason
          form={form}
          setForm={setForm}
          errors={errors}
        />

        <Delivery
          form={form}
          setForm={setForm}
          errors={errors}
        />

        <Confirm
          form={form}
          setForm={setForm}
          errors={errors}
        />

        <button type="submit">
          {editingIndex === null ? "Submit" : "Update"}
        </button>
      </form>
  
    </div>
  );
}

export default Form;