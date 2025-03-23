import React, { useState } from "react";


const MenuNav = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">
          <div className="d-flex justify-content-center justify-content-lg-start flex-grow-1">
            <ul className="navbar-nav justify-content-between ">
              <li className="nav-item">
                <a className="nav-link" href="#">Trang chủ</a>
              </li>
              <li className="nav-item mx-5 ">
                <a className="nav-link" href="#">Diễn đàn</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Tài khoản</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuNav;
