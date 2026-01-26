import type { RefillFormState } from "./refill-formstate";
import type { RefillRecord } from "./refill-record";
import type { FormErrors } from "./form-errors";

export interface AppState{
  form:RefillFormState;
  records:RefillRecord[];
  editId:number|null;
  errors:FormErrors;
  
};