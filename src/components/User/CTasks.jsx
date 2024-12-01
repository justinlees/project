import React from "react";
import { useLoaderData, NavLink, Outlet } from "react-router-dom";
import axios from "axios";

export default function CTasks() {
  const requestedTasks = useLoaderData();
  console.log(requestedTasks);
  return (
    <div className="ClientTasks">
      <h1>Tasks Page</h1>
      <div className="top-nav">
        <NavLink
          to="."
          end
          className={({ isActive }) => (isActive ? "activeTasks" : "")}
        >
          <div>Queued</div>
        </NavLink>
        <NavLink
          to="acceptedTasks"
          className={({ isActive }) => (isActive ? "activeTasks" : "")}
        >
          <div>Accepted</div>
        </NavLink>
        <NavLink
          to="recentTasks"
          className={({ isActive }) => (isActive ? "activeTasks" : "")}
        >
          <div>Recent</div>
        </NavLink>
      </div>
      <Outlet context={requestedTasks} />
    </div>
  );
}

export async function Loader({ params }) {
  const res = await axios.get(
    `http://localhost:5500/home/${params.userId}/tasks`
  );
  return res.data;
}
