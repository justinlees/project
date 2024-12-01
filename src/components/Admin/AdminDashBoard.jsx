import React from "react";

export default function AdminDashBoard() {
  return (
    <div className="adminDetail">
      <div className="topHeader">
        <h1>
          Admin <span>DashBoard</span>
        </h1>
      </div>
      <div className="briefDetails">
        <div className="graph">
          <div className="innerGraph"></div>
        </div>
        <div className="briefContent">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            placeat consectetur esse tempore nobis necessitatibus. Veritatis
            quam aspernatur culpa, suscipit consectetur sint vel dignissimos
            voluptatem totam, aut doloribus in? Officia?
          </p>
        </div>
      </div>
    </div>
  );
}