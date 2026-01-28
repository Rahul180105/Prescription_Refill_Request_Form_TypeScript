import React, { type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";

type MedicationProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
};

export function Medication({ form, setForm }: MedicationProps): ReactElement {
  function updateQuantity(index: number, value: number) {
    const meds = [...form.medications];
    meds[index] = { ...meds[index], quantity: value };
    setForm({ ...form, medications: meds });
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
            {form.medications.map((med, i) => (
              <tr key={i}>
                <td>{med.name}</td>
                <td>{med.dosage}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={med.quantity ?? 0}
                    onChange={(e) =>
                      updateQuantity(i, Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="error"></div>
      </div>
    </div>
  );
}

export default Medication;