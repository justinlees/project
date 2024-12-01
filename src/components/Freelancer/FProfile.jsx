import React from "react";
import { useOutletContext,Form,redirect,useActionData } from "react-router-dom";
import axios from "axios";

export default function FProfile() {
  const freelancerData = useOutletContext();
  const response = useActionData();

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
          <Form method="POST">
            <legend>Delete Account</legend>
            <input type="text" value="delete" name="delete"/>
            <button>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function Action({request,params}){
  const formData = Object.fromEntries(await request.formData());
  const res = await axios.post(`http://localhost:5500/freelancer/${params.fUser}/profile`,formData);
  if(res === "success"){
    return redirect("/");
  } else {
    return "";
  }
}