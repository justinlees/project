import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

export default function FdashBoard() {
  const params = useParams();
  const freelancerData = useOutletContext();
  const filteredData = freelancerData.tasksAssigned[0];
  return (
    <div className="freelanceDetail">
      <div className="topHeader2">
        <div className="left">
          <h1>DashBoard</h1>
          <h3>Hello {params.fUser}</h3>
        </div>
        <div className="right">
          <h2>CurrentTask</h2>
          <br/>
          <section>
            <p>Task Name: <b>{filteredData?.taskName}</b></p>
            <p>Client Name: <b>{filteredData?.clientId}</b></p>
            <p>click here for more....</p>
          </section>
        </div>
      </div>
      <div className="briefDetails">
        <div className="block1">
          <h4>Recent Tasks</h4>
          <p>ABCD</p>
          <p>ABCD</p>
          <p>ABCD</p>
        </div>
        <div className="block1 block2">
          <h4>Recent Earnings</h4>
          <p>ABCD</p>
          <p>ABCD</p>
          <p>ABCD</p>
        </div>
      </div>
    </div>
  );
}
