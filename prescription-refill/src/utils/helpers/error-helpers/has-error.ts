import type { FormErrors } from "../../../types/form-errors";

export function hasErrors(errors:FormErrors):boolean{
    return Object.keys(errors).length>0;
}