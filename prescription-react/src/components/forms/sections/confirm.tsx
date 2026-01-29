import React, { useState, type ReactElement } from "react";
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
  errors
}: ConfirmProps): ReactElement {
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [insuranceTouched, setInsuranceTouched] = useState(false);

  const insuranceValidation = validateInsurance(
    form.hasInsurance,
    form.insuranceNumber
  );
  const identityValidation = validateIdentity(form.confirmIdentity);

  return (
    <div className="section confirmations">


      <div
        className={`input-control ${
          (insuranceTouched || errors.insuranceNumber) &&
          !insuranceValidation.valid
            ? "has-error"
            : ""
        }`}
      >
        <label>
          <input
            type="checkbox"
            checked={form.hasInsurance}
            onChange={(e) => {
              setInsuranceTouched(true);
              setForm(prev => ({
                ...prev,
                hasInsurance: e.target.checked,
                insuranceNumber: e.target.checked
                  ? prev.insuranceNumber
                  : ""
              }));
            }}
          />
          Do you have Insurance
        </label>

        {form.hasInsurance && (
          <div className="insurance-number-collection">
            <label>Insurance Number</label>
            <input
              type="text"
              value={form.insuranceNumber}
              onChange={(e) => {
                setInsuranceTouched(true);
                setForm(prev => ({
                  ...prev,
                  insuranceNumber: e.target.value
                }));
              }}
              onBlur={() => setInsuranceTouched(true)}
            />

            {(insuranceTouched || errors.insuranceNumber) &&
              !insuranceValidation.valid && (
                <div className="error">
                  {errors.insuranceNumber ??
                    insuranceValidation.message}
                </div>
              )}
          </div>
        )}
      </div>

     
      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={form.needsConsulatation}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                needsConsulatation: e.target.checked
              }))
            }
          />
          Do you need Consultation
        </label>
      </div>

   
      <div
        className={`input-control ${
          (confirmTouched || errors.confirmation) &&
          !identityValidation.valid
            ? "has-error"
            : ""
        }`}
      >
        <label>
          <input
            type="checkbox"
            checked={form.confirmIdentity}
            onChange={(e) => {
              setConfirmTouched(true);
              setForm(prev => ({
                ...prev,
                confirmIdentity: e.target.checked
              }));
            }}
            onBlur={() => setConfirmTouched(true)}
          />
          Terms and Conditions
        </label>

        {(confirmTouched || errors.confirmation) &&
          !identityValidation.valid && (
            <div className="error">
              {errors.confirmation ??
                identityValidation.message}
            </div>
          )}
      </div>
    </div>
  );
}