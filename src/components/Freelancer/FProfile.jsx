import React from "react";
import { useOutletContext } from "react-router-dom";

export default function FProfile() {
  const freelancerData = useOutletContext();

  return (
    <div className="freelanceDetail freelanceProfile">
      <div className="topHeader">
        <h1>Profile Page</h1>
      </div>
      <div className="briefDetails">
        <div className="block1">
          <img alt="" />
          <h3>UserName: {freelancerData.UserName}</h3>
          <br />
          <p>FirstName: {freelancerData.FirstName}</p>
          <p>LastName: {freelancerData.LastName}</p>
          <p>Skills: {freelancerData.Skill}</p>
          <p>Email: {freelancerData.email}</p>
          <p>Phone Number: {freelancerData.MobileNo}</p>
        </div>
      </div>
    </div>
  );
}
