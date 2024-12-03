import React from "react";
import {
  useOutletContext,
  Form,
  Link,
  Outlet,
  redirect,
} from "react-router-dom";
import axios from "axios";

export default function FqueuedTasks() {
  const freelancerData = useOutletContext();
  const [requestVal, setRequestVal] = React.useState("");
  return (
    <>
      {freelancerData.bufferRequests ? (
        freelancerData.bufferRequests.map((item) => (
          <div className="requestedClients block1">
            <h3>{item.clientIds}</h3>
            <div className="requestButtons">
              <button type="button" style={{ backgroundColor: "turquoise" }}>
                <Link to="taskInfo">Info</Link>
              </button>
              <Form className="clientRequestForm" method="post">
                <input
                  type="text"
                  value={requestVal}
                  name="requestVal"
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  name="clientIds"
                  value={item.clientIds}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  value={item.taskName}
                  name="taskName"
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  name="taskDescription"
                  value={item.taskDescription}
                  style={{ display: "none" }}
                />
                <button
                  className="accept"
                  type="submit"
                  onClick={(e) => {
                    setRequestVal("accept");
                  }}
                >
                  Accept
                </button>
                <button
                  className="reject"
                  type="submit"
                  onClick={(e) => {
                    setRequestVal("reject");
                  }}
                >
                  Reject
                </button>
              </Form>
            </div>
            <Outlet context={item} />
          </div>
        ))
      ) : (
        <div className="requestedClients block1">
          <h1>No Tasks in QUEUE ....................</h1>
        </div>
      )}
    </>
  );
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  console.log(formData);
  const response = await axios.post(
    `http://localhost:5500/freelancer/${params.fUser}/tasks`,
    formData
  );
  console.log(response.data);
  if (response.data) {
    return redirect(`/freelancer/${params.fUser}/tasks`);
  }
}
