import React from "react";
import ReactDOM from "react-dom";
import {
  useOutletContext,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";

import axios from "axios";

export default function FProfile() {
  const freelancerData = useOutletContext();
  const [showPopUp, setShowPopUp] = React.useState("");
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
          <p>Account deletion</p>
          <button
            type="button"
            onClick={() => {
              setShowPopUp(1);
            }}
          >
            Delete
          </button>
          {showPopUp ? (
            <div className="deletePopUp">
              <Form method="POST">
                <legend>Confirm Deletion</legend>
                <input
                  type="text"
                  value="delete"
                  name="delete"
                  style={{ display: "none" }}
                />
                <button type="submit">Delete</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    setShowPopUp(0);
                  }}
                >
                  Cancel
                </button>
              </Form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  const res = await axios.post(
    `http://localhost:5500/freelancer/${params.fUser}/profile`,
    formData
  );
  if (res === "success") {
    return redirect("/");
  } else {
    return "";
  }
}
