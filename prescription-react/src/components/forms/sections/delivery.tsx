import React, { type ReactElement } from "react";

export function Delivery():ReactElement{
    return(
        <div className="section delivery-section">
                    
                <div className="input-control">
                    <label>Delivery Address *</label>
                    <textarea id="address"></textarea>
                    <div className="error"></div>
                </div>

                <div className="input-control">
                    <label>Delivery Method *</label>
                    <div className="options">
                        <label><input type="radio" name="d_method" value="SAME"/> Same Day</label>
                        <label><input type="radio" name="d_method" value="STANDARD"/> Standard</label>
                        <div className="error"></div>
                    </div>
                </div>

                <div className="input-control">
                    <label>Preffered Delivery date</label>
                    <input type="date" id="preffereddate"/>
                </div>
                
                <div className="input-control">
                    <label>Any Special Instructions</label>
                    <textarea id="instructions"></textarea>
                </div>
        </div>
    )
}
export default Delivery