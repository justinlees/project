import React from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import axios from "axios";

export default function ManagersInfo() {
  const errors = useActionData();
  return (
    <div className="adminDetail">
      <div className="topHeader">
        <h1>
          <span>Managers</span> Info
        </h1>
      </div>
      <div className="briefDetails">
        <div className="graph">
          <div className="innerGraph"></div>
        </div>
        <div className="briefContent">
          <Form method="post">
            <div className="display1">
              <fieldset>
                <label>Enter your FirstName</label>
                <input type="text" name="FirstName" />
                {errors?.FirstName && <p>Enter Valid String</p>}
              </fieldset>
              <fieldset>
                <label>Enter your LastName</label>
                <input type="text" name="LastName" />
              </fieldset>
              <fieldset>
                <label>Enter your DOB</label>
                <input type="date" name="DOB" />
              </fieldset>
            </div>
            <div className="display1">
              <fieldset>
                <label>Enter a UserName</label>
                <input type="text" name="UserName" />
              </fieldset>
              <fieldset>
                <label>Enter Password</label>
                <input type="password" name="Password" />
              </fieldset>
              <fieldset>
                <label>Enter your Email</label>
                <input type="email" name="Email" />
              </fieldset>
            </div>
            <div className="display1">
              <fieldset>
                <label>BankAccount No. </label>
                <input type="Number" name="AccNumber" />
              </fieldset>
              <fieldset>
                <label>IFSC Code</label>
                <input type="text" name="IFSCcode" />
              </fieldset>
              <fieldset>
                <label>Enter Banking Name</label>
                <input type="text" name="BankingName" />
              </fieldset>
            </div>
            <fieldset>
              <button type="button">Back</button>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  const errors = {};
  console.log("45678");
  const nameRegEx = /^[a-zA-Z]+$/;
  const userNameRegEx = /^[a-zA-Z]+\d{2}$/;
  const passwordRegEx = /^[a-zA-Z]{8,}$/;
  if (!nameRegEx.test(formData.FirstName))
    errors.FirstName = "Enter a valid String";
  if (!nameRegEx.test(formData.LastName))
    errors.LastName = "Enter a valid String";
  if (!userNameRegEx.test(formData.UserName))
    errors.UserName = "username example: example17";
  if (!passwordRegEx.test(formData.Password))
    errors.Password = "Enter a valid String";
  if (Object.keys(errors).length) {
    return errors;
  }
  console.log("45678");
  const response = await axios.post(
    `http://localhost:5500/admin/${params.aUser}/managersInfo`,
    formData
  );
  console.log(response.data);
  if (response.data) {
    return redirect(`/admin/${params.aUser}`);
  }
}
