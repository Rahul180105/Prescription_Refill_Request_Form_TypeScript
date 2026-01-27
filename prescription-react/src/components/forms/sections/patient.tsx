import React, { type ReactElement } from "react";

export function Patient():ReactElement{

    return (
    <div className="section patient-contact">
                        <div className="input-control">
                            <label>Patent ID</label>
                            <input type="text" id="ID"/>
                            <div className="error"></div>
                        </div>
                        <div className="input-control">
                            <label>Patient Name</label>
                            <input type="text" id="name" />
                            <div className="error"></div>
                        </div>
                        <div className="input-control">
                            <label>Date of Birth</label>
                            <input type="date" id="dob"/>
                            <div className="error"></div>
                        </div>
                        <div className="input-control">
                            <label>Phone *</label>
                            <input type="tel" id="phone"/>
                            <div className="error"></div>
                        </div>
                        <div className="input-control">
                            <label>Email *</label>
                            <input type="email" id="mail" />
                            <div className="error"></div>
                        </div>
                </div>
    )
}
export default Patient