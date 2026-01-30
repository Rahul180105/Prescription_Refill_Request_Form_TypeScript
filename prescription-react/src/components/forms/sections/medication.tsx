import { useState, type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import {
  validateMedicationRow,
  validateMedicationSection,
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
  errors,
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
      medications: updated,
    }));
  }

  return (
    <div className="mt-6">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <th className="px-4 py-3 text-left">Medication</th>
              <th className="px-4 py-3 text-left">Dosage</th>
              <th className="px-4 py-3 text-left">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {form.medications.map((med, index) => {
              const rowResult = validateMedicationRow(med.quantity);
              const showRowError =
                touchedRows[index] && !rowResult.valid ;

              return (
                <tr
                  key={med.name}
                  className={`border-t
                    ${
                      index % 2 === 0
                        ? "bg-white dark:bg-slate-900"
                        : "bg-slate-50 dark:bg-slate-800"
                    }
                  `}
                >
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {med.name}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {med.dosage}
                  </td>
                  <td className="px-4 py-3">
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
                          [index]: true,
                        }))
                      }
                      className={`
                        w-24 rounded-lg px-3 py-2 text-sm
                        bg-white text-slate-900
                        focus:outline-none
                        dark:bg-slate-800 dark:text-slate-100
                        ${
                          showRowError
                            ? "border border-red-500 ring-2 ring-red-400/30"
                            : "border border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
                        }
                      `}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

 
      {(errors.medications ||
        (!sectionValidation.valid &&
          Object.keys(touchedRows).length > 0)) && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errors.medications ?? sectionValidation.message}
        </p>
      )}
    </div>
  );
}

export default Medication;