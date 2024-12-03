import React from "react";
import { useOutletContext } from "react-router-dom";

export default function FRecent() {
  const freelancerData = useOutletContext();
  const [goBack, setGoBack] = React.useState("");
  return (
    <>
      {freelancerData.finishedTasks.length ? (
        freelancerData.finishedTasks.map((item) => (
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
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="acceptedClients block1">
          <h3>No Recent Tasks ....................</h3>
        </div>
      )}
    </>
  );
}
