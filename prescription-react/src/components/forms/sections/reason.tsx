import React, { type ReactElement, useState } from "react";
import { validateOtherReason,validateReason } from "../../../validations/reason";
import type { RefillFormState } from "../../../types";



type ReasonProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
};

export function Reason({ form, setForm }: ReasonProps): ReactElement {
  const [reasonTouched, setReasonTouched] = useState(false);
  const [otherTouched, setOtherTouched] = useState(false);

  if(form.reason){
  const reasonValidation = validateReason(form.reason);
  const otherValidation = validateOtherReason( form.reason, form.otherReason);}

  return (
    <div className="section approval-reason">
      <label>Reason for Refill *</label>

      <div className="input-control">
        {["RUNNING OUT", "LOST", "TRAVELLING", "OTHER"].map((r) => (
          <label key={r}>
            <input
              type="radio"
              name="reason"
              value={r}
              checked={form.reason === r}
              onChange={() => {
                setReasonTouched(true);
                setForm({
                  ...form,
                  reason: r,
                  otherReason: r === "OTHER" ? form.otherReason : "",
                });
              }}
            />
            {r}
          </label>
        ))}

        {reasonTouched && !validateReason(form.reason??'').valid && (
          <div className="error">{validateReason(form.reason??'').message}</div>
        )}

        {form.reason === "OTHER" && (
          <div className="others-box">
            <label>Please Specify</label>
            <input
              type="text"
              value={form.otherReason}
              onChange={(e) => {
                setOtherTouched(true);
                setForm({ ...form, otherReason: e.target.value });
              }}
              onBlur={() => setOtherTouched(true)}
            />

            {otherTouched && !validateOtherReason(form.reason,form.otherReason).valid && (
              <div className="error">{validateOtherReason(form.reason,form.otherReason).message}</div>
            )}
          </div>
        )}
      </div>

      <div className="input-control">
        <label>Doctor's Last Approval Date</label>
        <input type="date" value={form.lastApprovalDate} readOnly />
      </div>
    </div>
  );
}

export default Reason;