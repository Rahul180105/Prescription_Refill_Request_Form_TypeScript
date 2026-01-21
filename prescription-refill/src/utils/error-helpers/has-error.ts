import type { FormErrors } from "../../types";

export function hasErrors(errors:FormErrors):boolean{
    return Object.keys(errors).length>0;
}