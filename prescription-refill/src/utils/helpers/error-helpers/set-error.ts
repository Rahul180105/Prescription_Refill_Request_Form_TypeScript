import { state } from "../../../states/app-state";
import type { FormErrors } from "../../../types/form-errors";

export function setErrors(errors:FormErrors):void{
    state.errors=errors;
}
