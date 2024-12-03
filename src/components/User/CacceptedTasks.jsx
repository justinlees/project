import React from "react";
import { useOutletContext, useActionData, Link } from "react-router-dom";

export default function CAcceptedTasks() {
  const requestedTasks = useOutletContext();
  const errors = useActionData();
  return (
    <div
      className="connections"
      style={{
        backgroundColor: "whitesmoke",
        width:"100%",
        height:"100%",
      }}
    >
      {errors?.cancel && <span>{errors.cancel}</span>}
      {requestedTasks.tasksRequested?.map((item) => (
        <div style={{
          backgroundColor: "whitesmoke",
          width: "100%",
          height:"100%",
        }}>
          <p>{item.taskName}</p>
          <p>{item.taskDescription}</p>
          <Link to={`../${item.lancerId}/messages`}>Message</Link>
        </div>
      ))}
    </div>
  );
}
