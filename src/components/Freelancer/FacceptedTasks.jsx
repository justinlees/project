import React from "react";
import { useOutletContext, Link, Outlet, Form } from "react-router-dom";
import axios from "axios";

export default function FacceptedTasks() {
  const freelancerData = useOutletContext();
  const [goBack, setGoBack] = React.useState("");
  const [Mark, setMark] = React.useState("");
  return (
    <>
      {freelancerData.tasksAssigned.length ? (
        freelancerData.tasksAssigned.map((item) => (
          <div className="acceptedTasks block1">
            <div className="acceptedRequests">
              <h3>{item.clientId}</h3>
              <div className="acceptButtons">
                <button
                  type="button"
                  onClick={() => {
                    setGoBack(item.clientId);
                  }}
                >
                  Info
                </button>
                <button type="button" style={{ backgroundColor: "black" }}>
                  <Link
                    to={`../${item.clientId}/messages`}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Message
                  </Link>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMark(1);
                  }}
                >
                  Mark Complete
                </button>
                {Mark ? (
                  <div className="PopUp">
                    <Form method="POST">
                      <input
                        text="text"
                        value={item.clientId}
                        name="clientId"
                        style={{ display: "none" }}
                      />
                      <input
                        text="text"
                        value={item.taskName}
                        name="taskName"
                        style={{ display: "none" }}
                      />
                      <button type="submit" id="confirmation">
                        Mark Complete
                      </button>
                      <button
                        id="cancel"
                        onClick={() => {
                          setMark(0);
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

            {goBack ? (
              <div className="taskInfo" id={item.clientId}>
                <section>{item?.taskName}</section>
                <section>{item?.taskDescription}</section>
                <section
                  onClick={() => {
                    setGoBack(0);
                  }}
                >
                  &larr; back
                </section>
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <div className="acceptedClients block1">
          <h3>No Tasks Accepted ....................</h3>
        </div>
      )}
    </>
  );
}

export async function Action({ request, params }) {
  const formData = Object.fromEntries(await request.formData());
  const res = await axios.post(
    `http://localhost:5500/freelancer/${params.fUser}/tasks/acceptedTasks`,
    formData
  );
  if (res) {
    return "";
  }
}
