import { createInput } from "../../elements/input-box";
import { state } from "../../../../app.state";
import { wireInput } from "../../../../utils/dom";
import { findPatientById } from "../../../../app.logic";
import { errorRender } from "../../../../utils/error-helpers/error-render";
import { renderApp } from "../../../App";
import { clearPatientData } from "../../../../utils/clear-patientdata";
import { populatePatientData } from "../../../../utils/populate-patientdata";

let wasPatientValid = false;

export function PatientSection(): HTMLDivElement {
  const patientSection = document.createElement("div");
  patientSection.className = "section patient-contact";

  const patientIdControl = createInput("Patient ID", "text");
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
      const patientId=state.form.patientId;
      if(!patientId){
        state.errors.patientId='patient is reqd';
      }
      else{state.errors.patientId='';}
      errorRender(patientIdControl,state.errors.patientId);
    })
  }

  patientSection.appendChild(patientIdControl);
  errorRender(patientIdControl, state.errors.patientId);


  const nameControl = createInput("Patient Name", "text");
  const nameInput = nameControl.querySelector("input");
  if (nameInput) {
    nameInput.value = state.form.patientName;
    nameInput.readOnly = true;
  }
  patientSection.appendChild(nameControl);


  const dobControl = createInput("Date of Birth", "date");
  const dobInput = dobControl.querySelector("input");
  if (dobInput) {
    dobInput.value = state.form.dateOfBirth;
    dobInput.readOnly = true;
  }
  patientSection.appendChild(dobControl);


  const phoneControl = createInput("Phone", "tel");
  const phoneInput = phoneControl.querySelector("input");

  if (phoneInput) {
    wireInput(
      phoneInput,
      () => state.form.phone,
      (value) => {
        const phone = value.trim();
        state.form.phone = phone;

        if (!phone) {
          errorRender(phoneControl, "Phone number is required");
          return;
        }
        if (!/^\d+$/.test(phone)) {
          errorRender(phoneControl, "Only digits allowed");
          return;
        }
        if (phone.length !== 10) {
          errorRender(phoneControl, "Phone number must be 10 digits");
          return;
        }
        errorRender(phoneControl, "");
      }
    );
    phoneInput.addEventListener('blur',()=>{
      const phone=state.form.phone;
      if(!phone){
        state.errors.phone='phone no. is reqd';
      } else{state.errors.phone='';}
      errorRender(phoneControl,state.errors.phone);
    })
  }

  patientSection.appendChild(phoneControl);
  errorRender(phoneControl, state.errors.phone);


const emailControl = createInput("Email", "email");
const emailInput = emailControl.querySelector("input");

if (emailInput) {
  wireInput(
    emailInput,
    () => state.form.email,
    (value) => {
      const email = value.trim();
      state.form.email = email;

      if (!email) {
        errorRender(emailControl, "Email is required");
        return;
      }

      if (email.includes(" ")) {
        errorRender(emailControl, "Email must not contain spaces");
        return;
      }
      const parts = email.split("@");
      if (parts.length !== 2) {
        errorRender(emailControl, "Email must contain one @");
        return;
      }

      const [local, domain] = parts;
      if (!local || local.startsWith('.')) {
        errorRender(emailControl, "Invalid email format");
        return;
      }

      if (
        !domain ||
        !domain.includes(".") ||
        domain.startsWith(".") ||
        domain.endsWith(".")
      ) {
        errorRender(emailControl, "Invalid email domain");
        return;
      }
      errorRender(emailControl, "");
    }
  );
  emailInput.addEventListener('blur',()=>{
      const email=state.form.email;
      if(!email){
        state.errors.email='phone no. is reqd';
      } else{state.errors.email='';}
      errorRender(emailControl,state.errors.email);
    })
}

patientSection.appendChild(emailControl);
errorRender(emailControl, state.errors.email);

  return patientSection;
}



