import React from "react";
import { useOutletContext,Form,redirect,useActionData } from "react-router-dom";
import axios from "axios";

export default function CProfile() {
  const clientData = useOutletContext();
  const response = useActionData();

  return (
    <div className="userDetail userProfile">
      <div className="topHeader">
        <h1>Profile Page</h1>
      </div>
      <div className="briefDetails">
        <div className="block1">
          <img alt="" />
          <h3>UserName: {clientData.UserName}</h3>
          <br />
          <p>FirstName: {clientData.FirstName}</p>
          <p>LastName: {clientData.LastName}</p>
          <p>Skills: {clientData.Skill}</p>
          <p>Email: {clientData.email}</p>
          <p>Phone Number: {clientData.MobileNo}</p>
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
  const res = await axios.post(`http://localhost:5500/home/${params.userId}/profile`,formData);
  if(res === "success"){
    return redirect("/");
  } else {
    return "";
  }
}