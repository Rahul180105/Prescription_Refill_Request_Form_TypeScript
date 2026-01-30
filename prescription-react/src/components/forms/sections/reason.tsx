import { useState, type ReactElement } from "react";
import {
  validateReason,
  validateOtherReason,
} from "../../../validations/reason";
import type { RefillFormState, FormErrors } from "../../../types";

type ReasonProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
  errors: Partial<FormErrors>;
};

export function Reason({
  form,
  setForm,
  errors,
}: ReasonProps): ReactElement {
  const [reasonTouched, setReasonTouched] = useState(false);
  const [otherTouched, setOtherTouched] = useState(false);

  const reasonValidation = validateReason(form.reason ?? "");
  const otherValidation = validateOtherReason(
    form.reason ?? "",
    form.otherReason
  );

  const showReasonError =
    (reasonTouched || errors.reason) && !reasonValidation.valid;

  const showOtherError =
    (otherTouched || errors.otherReason) && !otherValidation.valid;

  return (
    <div className="mt-6 space-y-6">

      <div>
        <p className="mb-2 text-sm font-medium text-slate-70 dark:text-slate-300">
          Reason for Refill *
        </p>

        <div className="space-y-3">
          {["RUNNING OUT", "LOST", "TRAVELLING", "OTHER"].map(reason => (
            <label
              key={reason}
              className="flex items-center gap-3 text-sm text-slate-70 dark:text-slate-300"
            >
              <input
                type="radio"
                name="reason"
                checked={form.reason === reason}
                onChange={() => {
                  setReasonTouched(true);
                  setForm(prev => ({
                    ...prev,
                    reason,
                    otherReason:
                      reason === "OTHER" ? prev.otherReason : "",
                  }));
                }}
                onBlur={() => setReasonTouched(true)}
                className="
                  h-4 w-4
                  border-slate-300
                  text-blue-600
                  focus:ring-2 focus:ring-blue-500
                  dark:border-slate-60 dark:bg-slate-800
                "
              />
              {reason}
            </label>
          ))}
        </div>

        {showReasonError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.reason ?? reasonValidation.message}
          </p>
        )}
      </div>


      {form.reason === "OTHER" && (
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
            Please Specify
          </label>

          <input
            type="text"
            value={form.otherReason}
            onChange={e => {
              setOtherTouched(true);
              setForm(prev => ({
                ...prev,
                otherReason: e.target.value,
              }));
            }}
            onBlur={() => setOtherTouched(true)}
            className={`
              w-full rounded-lg px-3 py-2 text-sm
              bg-white text-slate-900
              focus:outline-none
              dark:bg-slate-800 dark:text-slate-100
              ${
                showOtherError
                  ? "border-red-500 ring-2 ring-red-400/30"
                  : "border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
              }
            `}
          />

          {showOtherError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.otherReason ?? otherValidation.message}
            </p>
          )}
        </div>
      )}


      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
          Doctor&apos;s Last Approval Date
        </label>

        <input
          type="date"
          value={form.lastApprovalDate}
          readOnly
          className="
            w-full rounded-lg px-3 py-2 text-sm
            bg-slate-100 text-slate-60
            border border-slate-300
            dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400
          "
        />
      </div>
    </div>
  );
}

export default Reason;