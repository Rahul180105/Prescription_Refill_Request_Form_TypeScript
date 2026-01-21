import { state,initialFormState } from "../app.state";

export function resetFormState():void{
  state.form={...initialFormState};
  state.editId=null;
  state.errors={}
}