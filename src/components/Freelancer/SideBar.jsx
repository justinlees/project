import React from "react";
import { NavLink, useParams, Navigate } from "react-router-dom";

export default function FsideBar() {
  const params = useParams();
  return (
    <nav className="fSideBar">
      <div className="top">
        <figure>
          <img src="" alt="" />
          <figcaption>{params.fUser.charAt(0).toUpperCase()}</figcaption>
        </figure>
        <h2>{params.fUser}</h2>
        <h3>Rating:$$$$$</h3>
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
        <button>&larr; Collapse</button>
      </div>
    </nav>
  );
}
