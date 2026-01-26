import { createInput } from "../../elements/input-box";
import { renderApp } from "../../../App";
import { clearPatientData } from "../../../../utils/helpers/clear-patientdata";
import { populatePatientData } from "../../../../utils/helpers/populate-patientdata";
import { findPatientById } from "../../../../utils/helpers/find-patientid";
import { wireInput } from "../../../../utils/wire-fns/wire-input";
import { state } from "../../../../states/app-state";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";

let wasPatientValid=false;
export function patientID():HTMLDivElement{
    const patientIdControl = createInput("Patient ID*", "text");
    const patientIdInput = patientIdControl.querySelector("input");
  
    if (patientIdInput) {
      wireInput(
        patientIdInput,
        () => state.form.patientId,
        (value) => {
          const id = value.trim();
          state.form.patientId = id;
  
          const patient = findPatientById(id);
          const isValid = Boolean(patient);
  
          if (!isValid) {
            errorRender(patientIdControl, "Invalid Patient ID");
            if (wasPatientValid) {
              clearPatientData();
              renderApp();
            }
            wasPatientValid = false;
            return;
          }
          errorRender(patientIdControl, "");
          if (!wasPatientValid && patient) {
            populatePatientData(patient);
            renderApp();
          }
          wasPatientValid = true;
        }
      );
      patientIdInput.addEventListener('blur',()=>{
        const patient=state.form.patientId;
        if(!patient || !findPatientById(patient)){
          state.errors.patientId='patientID is reqd';
        }
        else{state.errors.patientId='';}
        errorRender(patientIdControl,state.errors.patientId);
      })
    }
    errorRender(patientIdControl, state.errors.patientId);
    return patientIdControl;
}