import React, { type ReactElement, useState } from "react";
import {
  validateReason,
  validateOtherReason
} from "../../../validations/reason";
import type { RefillFormState,FormErrors } from "../../../types";


type ReasonProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
  errors: Partial<FormErrors>;
};

export function Reason({
  form,
  setForm,
  errors
}: ReasonProps): ReactElement {
  const [reasonTouched, setReasonTouched] = useState(false);
  const [otherTouched, setOtherTouched] = useState(false);

  const reasonValidation = validateReason(form.reason ?? "");
  const otherValidation = validateOtherReason(
    form.reason??'' ,
    form.otherReason
  );

  return (
    <div className="section approval-reason">
      <label>Reason for Refill *</label>

      <div className="input-control ">
        {["RUNNING OUT", "LOST", "TRAVELLING", "OTHER"].map((r) => (
          <label key={r}>
            <input
              type="radio"
              name="reason"
              value={r}
              checked={form.reason === r}
              onChange={() => {
                setReasonTouched(true);
                setForm(prev => ({
                  ...prev,
                  reason: r,
                  otherReason: r === "OTHER" ? prev.otherReason : ""
                }));
              }}
              onBlur={() => setReasonTouched(true)}
            />
            {r}
          </label>
        ))}

        {(reasonTouched || errors.reason) &&
          !reasonValidation.valid && (
            <div className="error">
              {errors.reason ?? reasonValidation.message}
            </div>
          )}
      </div>

      {form.reason === "OTHER" && (
        <div
          className={`input-control others-box ${
            (otherTouched || errors.otherReason) &&
            !otherValidation.valid
              ? "has-error"
              : ""
          }`}
        >
          <label>Please Specify</label>
          <input
            type="text"
            value={form.otherReason}
            onChange={(e) => {
              setOtherTouched(true);
              setForm(prev => ({
                ...prev,
                otherReason: e.target.value
              }));
            }}
            onBlur={() => setOtherTouched(true)}
          />

          {(otherTouched || errors.otherReason) &&
            !otherValidation.valid && (
              <div className="error">
                {errors.otherReason ?? otherValidation.message}
              </div>
            )}
        </div>
      )}

      <div className="input-control">
        <label>Doctor's Last Approval Date</label>
        <input type="date" value={form.lastApprovalDate} readOnly />
      </div>
    </div>
  );
}

export default Reason;