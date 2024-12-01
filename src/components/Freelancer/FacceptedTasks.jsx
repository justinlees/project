import React from "react";
import { useOutletContext, Link, Outlet } from "react-router-dom";

export default function FacceptedTasks() {
  const freelancerData = useOutletContext();
  return (
    <>
      {freelancerData.tasksAssigned?.map((item) => (
        <div className="acceptedTasks block1">
          <div className="acceptedRequests">
            <h3>{item.clientId}</h3>
            <div className="acceptButtons">
              <button type="button">
                <Link
                  to={`${item.clientId}/taskInfo`}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  Info
                </Link>
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
          <Outlet context={item} />
        </div>
      ))}
    </>
  );
}
