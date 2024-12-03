import React from "react";
import { useOutletContext, Link, Outlet } from "react-router-dom";

export default function FacceptedTasks() {
  const freelancerData = useOutletContext();
  const [goBack, setGoBack] = React.useState("");
  return (
    <>
      {freelancerData.tasksAssigned ? (
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
          <h1>No Tasks Accepted ....................</h1>
        </div>
      )}
    </>
  );
}
