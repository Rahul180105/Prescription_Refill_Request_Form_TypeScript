import React, { type ReactElement } from "react";
import { Patient } from "./sections/patient";
import {Medication} from "./sections/medication";
import Reason from "./sections/reason";
import Delivery from "./sections/delivery";
import { Confirm } from "./sections/confirm";


export function Form():ReactElement{

    return (
        <div className="page-layout">
          <div className="form" id="formContainer">
            <form id="refill">
                <label ><strong>REFILL FORM</strong></label>
                <Patient/>
                <Medication/>
                <Reason/>
                <Delivery/>
                <Confirm/>      
                <button type="submit">Submit</button>
            </form>
          </div>
        </div>
    )
}
export default Form