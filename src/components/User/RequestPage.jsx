import React from "react";
import { Form, useParams, useOutletContext, redirect } from "react-router-dom";
import axios from "axios";

export default function RequestPage() {
  const params = useParams();
  const userData = useOutletContext();
  const filterData = userData.freelancer.filter(
    (item) => item.UserName === params.fUser
  );

  return (
    <div className="requestPage">
      <h1>Task Description Page</h1>
      {filterData?.map((item) => (
        <div>
          <div className="left">
            <ul>
              <li>
                <b>{item?.UserName}</b>
              </li>
              <li>{item?.FirstName}</li>
              <li>{item?.LastName}</li>
              <li>{item?.MobileNo}</li>
            </ul>
          </div>
          <div className="right">
            <Form method="post">
              <input type="text" value={params.fUser} name="lancerId" />
              <input
                type="text"
                value={userData.user.UserName}
                name="clientId"
              />
              <input
                type="text"
                placeholder="TaskName"
                name="taskName"
                required
                className="AboutTask"
                id="TaskName"
              />
              <input
                type="text"
                placeholder="Task Description...."
                name="taskDescription"
                required
                className="AboutTask"
                id="TaskDescription"
              />
              <button type="submit">Request</button>
            </Form>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function Action({ params, request }) {
  const formData = Object.fromEntries(await request.formData());
  const res = await axios.post(
    `http://localhost:5500/home/${params.userId}/${params.fUser}/requestPage`,
    formData
  );
  if (res.data) return redirect(`/home/${params.userId}/tasks`);
}
