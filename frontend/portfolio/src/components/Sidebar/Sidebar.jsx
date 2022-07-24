import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SidebarItemsUpper, SidebarItemsLower } from "./SidebarItems";
import "./Sidebar.css";

function Sidebar(props) {
  // Using useLocation hook to get the current pathname and set the active class on the current path
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="nav-menu active">
        <ul className="nav-menu-items nav-upper">
          {SidebarItemsUpper.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link
                  to={item.path}
                  className={
                    splitLocation[1] === item.name ? "active-link" : ""
                  }
                >
                  <span
                    className={
                      splitLocation[1] === item.name
                        ? "link-item active-ellipse"
                        : "link-item icon-ellipse"
                    }
                  >
                    {" "}
                    <img src={item.icon} alt="" />{" "}
                  </span>
                  <span className="link-name-span">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="nav-menu-items nav-lower">
          {SidebarItemsLower.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <button
                  className={
                    splitLocation[1] === item.name ? "active-link" : ""
                  }
                  onClick={handleLogout}
                >
                  <span
                    className={
                      splitLocation[1] === item.name
                        ? "link-item active-ellipse"
                        : "link-item icon-ellipse"
                    }
                  >
                    {" "}
                    <img src={item.icon} alt="" />{" "}
                  </span>
                  <span className="link-name-span">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
