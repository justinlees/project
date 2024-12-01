import React from "react";
import { useOutletContext } from "react-router-dom";

export default function AProfile() {
  const adminData = useOutletContext();
  console.log(adminData);
  return (
    <div className="adminProfile">
      <div className="topHeader">
        <h1>
          Admin <span>Profile</span>
        </h1>
      </div>
      <div className="briefDetails">
        <div className="briefContent">
          <h2>{adminData.UserName}</h2>
          <p>FirstName: {adminData.FirstName}</p>
          <p>LastName: {adminData.LastName}</p>
          <p>Email: {adminData.email}</p>
          <p>Mobile: {adminData.MobileNo}</p>
        </div>
      </div>
    </div>
  );
}
