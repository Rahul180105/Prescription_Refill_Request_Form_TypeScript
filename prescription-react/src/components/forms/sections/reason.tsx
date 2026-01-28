import React, { type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";

type ReasonProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
};

export function Reason({ form, setForm }: ReasonProps): ReactElement {
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
              onChange={() =>
                setForm({
                  ...form,
                  reason: r,
                  otherReason: r === "OTHER" ? form.otherReason : "",
                })
              }
            />
            {r}
          </label>
        ))}

        {form.reason === "OTHER" && (
          <div className="others-box">
            <label>Please Specify</label>
            <input
              type="text"
              value={form.otherReason}
              onChange={(e) =>
                setForm({ ...form, otherReason: e.target.value })
              }
            />
            <div className="error"></div>
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