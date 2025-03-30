import React from "react";
import { NavLink } from "react-router-dom";

const MenuNav = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        <div className="d-flex justify-content-center justify-content-lg-start flex-grow-1">
          <ul className="navbar-nav justify-content-between">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold text-primary" : "")
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink
                to="/forum"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold text-primary" : "")
                }
              >
                Diễn đàn
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/student"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold text-primary" : "")
                }
              >
                Tài khoản
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuNav;
