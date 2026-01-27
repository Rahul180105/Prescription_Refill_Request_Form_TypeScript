import React, { type ReactElement } from "react";

export function Confirm():ReactElement{
    return(
    <div className="section confirmations">
                   
        <div className="input-control">
            <label><input type="checkbox" id="insurance" />Do you have Insurance</label>
            <div className="insurance-number-collection">
                <label>Insurance Number</label>
                <input type="text" id="insurance-number" />
                <div className="error"></div>
            </div>
            <div className="error"></div>    
        </div>


        <div className="input-control">
            <label><input type="checkbox" id="consultation" />Do you need Consultation</label>
        </div>

        <div className="input-control">
            <label><input type="checkbox" id="confirmation"/><a href="javascript:void(0)" >Terms And Conditions</a></label>
            <div className="error"></div>
        </div>
    </div>
    )
}