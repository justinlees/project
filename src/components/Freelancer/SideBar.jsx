import React from "react";
import { NavLink, useParams, Navigate, redirect } from "react-router-dom";

const handleLogout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');

  // Redirect to the home page
  window.location.href = '/';
};

export default function FsideBar() {
  const params = useParams();
  return (
    <nav className="fSideBar">
      <div className="top">
        <figure>
          <figcaption>{params.fUser.charAt(0).toUpperCase()}</figcaption>
        </figure>
        <h2>{params.fUser}</h2>
        <hr />
      </div>
      <div className="middle">
        <ul>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "activeNavLink" : "NavLink"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tasks"
              className={({ isActive }) =>
                isActive ? "activeNavLink" : "NavLink"
              }
            >
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="earnings"
              className={({ isActive }) =>
                isActive ? "activeNavLink" : "NavLink"
              }
            >
              Earnings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                isActive ? "activeNavLink" : "NavLink"
              }
            >
              DashBoard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive ? "activeNavLink" : "NavLink"
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
