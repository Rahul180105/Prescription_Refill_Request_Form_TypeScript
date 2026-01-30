import { useState, type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import { validateInsurance } from "../../../validations/confirm/validate-insurance";
import { validateIdentity } from "../../../validations/confirm/validate-identity";
import type { FormErrors } from "../../../types";

type ConfirmProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
  errors: Partial<FormErrors>;
};

export function Confirm({
  form,
  setForm,
  errors,
}: ConfirmProps): ReactElement {
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [insuranceTouched, setInsuranceTouched] = useState(false);

  const insuranceValidation = validateInsurance(
    form.hasInsurance,
    form.insuranceNumber
  );
  const identityValidation = validateIdentity(form.confirmIdentity);

  const showInsuranceError =
    (insuranceTouched || errors.insuranceNumber) &&
    !insuranceValidation.valid;

  const showConfirmError =
    (confirmTouched || errors.confirmation) &&
    !identityValidation.valid;

  return (
    <div className="mt-6 space-y-6">
 
      <div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.hasInsurance}
            onChange={e => {
              setInsuranceTouched(true);
              setForm(prev => ({
                ...prev,
                hasInsurance: e.target.checked,
                insuranceNumber: e.target.checked
                  ? prev.insuranceNumber
                  : "",
              }));
            }}
            className="
              h-4 w-4
              rounded
              border border-slate-300
              text-blue-600
              focus:ring-2 focus:ring-blue-500
              dark:border-slate-600 dark:bg-slate-800
            "
          />
          <span className="text-sm font-medium text-slate-70 dark:text-slate-300">
            Do you have Insurance
          </span>
        </div>

        {form.hasInsurance && (
          <div className="mt-3">
            <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
              Insurance Number
            </label>

            <input
              type="text"
              value={form.insuranceNumber}
              onChange={e => {
                setInsuranceTouched(true);
                setForm(prev => ({
                  ...prev,
                  insuranceNumber: e.target.value,
                }));
              }}
              onBlur={() => setInsuranceTouched(true)}
              className={`
                w-full rounded-lg px-3 py-2 text-sm
                bg-white text-slate-900
                focus:outline-none focus:ring-2
                dark:bg-slate-800 dark:text-slate-100
                ${
                  showInsuranceError
                  ? "border-red-500 ring-2 ring-red-400/30"
                  : "border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
                }
              `}
            />

            {showInsuranceError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.insuranceNumber ??
                  insuranceValidation.message}
              </p>
            )}
          </div>
        )}
      </div>

  
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.needsConsulatation}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              needsConsulatation: e.target.checked,
            }))
          }
          className="
            h-4 w-4
            rounded
            border border-slate-300
            text-blue-600
            focus:ring-2 focus:ring-blue-500
            dark:border-slate-600 dark:bg-slate-800
          "
        />
        <span className="text-sm font-medium text-slate-70 dark:text-slate-300">
          Do you need Consultation
        </span>
      </div>


      <div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.confirmIdentity}
            onChange={e => {
              setConfirmTouched(true);
              setForm(prev => ({
                ...prev,
                confirmIdentity: e.target.checked,
              }));
            }}
            onBlur={() => setConfirmTouched(true)}
            className="
              h-4 w-4
              rounded
              border border-slate-300
              text-blue-600
              focus:ring-2 focus:ring-blue-500
              dark:border-slate-600 dark:bg-slate-800
            "
          />
          <span className="text-sm font-medium text-slate-70 dark:text-slate-300">
            I agree to the Terms and Conditions
          </span>
        </div>

        {showConfirmError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.confirmation ??
              'confirm identity'}
          </p>
        )}
      </div>
    </div>
  );
}

export default Confirm;