import React from "react";
import { NavLink } from "react-router-dom";

export default function AsideBar() {
  return (
    <nav className="adminSideBar">
      <div className="top">
        <>
          <img className="adminPic" alt="" />
          <h1>Username</h1>
          <hr />
        </>
      </div>
      <ul className="middle">
        <li>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? "ActiveNavLink" : "NavLink"
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="managersInfo"
            className={({ isActive }) =>
              isActive ? "ActiveNavLink" : "NavLink"
            }
          >
            Managers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="profit"
            className={({ isActive }) =>
              isActive ? "ActiveNavLink" : "NavLink"
            }
          >
            Profit
          </NavLink>
        </li>
        <li>
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              isActive ? "ActiveNavLink" : "NavLink"
            }
          >
            DashBoard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive ? "ActiveNavLink" : "NavLink"
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
      <div className="bottom">
        <button>&larr;Collapse</button>
      </div>
    </nav>
  );
}
