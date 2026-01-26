import { wireInput } from "../../../../utils/wire-fns/wire-input";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";
import { state } from "../../../../states/app-state";
import { createInput } from "../../elements/input-box";

export function patientEmail():HTMLDivElement{
  const emailControl = createInput("Email*", "email");
  const emailInput = emailControl.querySelector("input");
  let isvalid=false;
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
        isvalid=true;
        errorRender(emailControl, "");
      }
    );
    emailInput.addEventListener('blur',()=>{
        const email=state.form.email;
        if(!email||!isvalid){
          state.errors.email='email is reqd';
        } else{state.errors.email='';}
        errorRender(emailControl,state.errors.email);
      })
  }
  errorRender(emailControl, state.errors.email);
  return emailControl;
  
}