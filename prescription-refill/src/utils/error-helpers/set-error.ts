import { state } from "../../app.state";
import type { FormErrors } from "../../types";

export function setErrors(errors:FormErrors):void{
    state.errors=errors;
}
