
import React, { type ReactElement, useState } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import {
  validateMedicationRow,
  validateMedicationSection
} from "../../../validations/medication";
import type { FormErrors } from "../../../types";

type MedicationProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
  errors: Partial<FormErrors>;
};

export function Medication({
  form,
  setForm,
  errors
}: MedicationProps): ReactElement {

  const [touchedRows, setTouchedRows] = useState<Record<number, boolean>>({});
  const sectionValidation = validateMedicationSection(form.medications);

  function updateQuantity(index: number, value: string) {
    const num = Number(value);
    const quantity = isNaN(num) ? 0 : num;

    const updated = [...form.medications];
    updated[index] = { ...updated[index], quantity };

    setTouchedRows(prev => ({ ...prev, [index]: true }));

    setForm(prev => ({
      ...prev,
      medications: updated
    }));
  }

  return (
    <div className="section medication-section">
      <div className="input-control">
        <table className="medication-table">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {form.medications.map((med, index) => {
              const rowResult = validateMedicationRow(med.quantity);
              const showRowError =
                touchedRows[index] && !rowResult.valid;

              return (
                <tr key={med.name}>
                  <td>{med.name}</td>
                  <td>{med.dosage}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      max={12}
                      value={med.quantity}
                      onChange={e =>
                        updateQuantity(index, e.target.value)
                      }
                      onBlur={() =>
                        setTouchedRows(prev => ({
                          ...prev,
                          [index]: true
                        }))
                      }
                      className={showRowError ? "qty-error" : ""}
            
                    />
          
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* SECTION ERROR (submit OR live) */}
        {(errors.medications ||
          (!sectionValidation.valid &&
            Object.keys(touchedRows).length > 0)) && (
          <div className="error">
            {errors.medications ??
              sectionValidation.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Medication;