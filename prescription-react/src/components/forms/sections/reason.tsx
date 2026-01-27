import React, { type ReactElement } from 'react'

export function Reason ():ReactElement{
  return (
    <div className="section approval-reason">
                 
                        <label>Reason for Refill*</label>
                        <div className="input-control">
                            <label><input type="radio" name="reason" value="RUNNING OUT" />Running Out</label>
                            <label><input type="radio" name="reason" value="LOST" />Lost</label>
                            <label><input type="radio" name="reason" value="TRAVELLING" />Travelling</label>
                            <label><input type="radio" name="reason" value="OTHER" />Other</label>
                     
                            <div className="others-box">
                                <label>Please Specify</label>
                                <input type="text" id="others-content" />
                                <div className="error"></div>
                            </div>
                            <div className="error"></div>
                        </div>

                        <div className="input-control">
                            <label>Doctor's Last Approval Date</label>
                            <input type="date" id="approval" />
                        </div>
                </div>
  )
}

export default Reason
