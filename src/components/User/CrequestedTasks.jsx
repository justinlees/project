import React from "react";
import {
  useOutletContext,
  useActionData,
  Form,
  redirect,
} from "react-router-dom";
import axios from "axios";

export default function CRequestedTasks() {
  const requestedTasks = useOutletContext();
  const errors = useActionData();
  return (
    <div
      className="connections"
      style={{
        backgroundColor: "whitesmoke",
        width: "10rem",
      }}
    >
      {errors?.cancel && <span>{errors.cancel}</span>}
      {requestedTasks.bufferRequests?.map((item) => (
        <div>
          <h2>{item.taskName}</h2>
          <p>{item.taskDescription}</p>
          <Form method="post">
            <input
              type="text"
              value={requestedTasks.UserName}
              name="UserName"
            />
            <input type="text" value={item.lancerIds} name="lancerIds" />
            <button type="submit">Cancel</button>
          </Form>
        </div>
      ))}
    </div>
  );
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  const errors = {};
  const response = await axios.post(
    `http://localhost:5500/home/${params.userId}/tasks`,
    formData
  );

  if (response.data === "requestCancel") {
    return redirect(`/home/${params.userId}/tasks`);
  } else {
    errors.cancel = "request Not processed. Try again.";
    return errors;
  }
}
