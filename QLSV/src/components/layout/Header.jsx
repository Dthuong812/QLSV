import React from "react";
import {Input, Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
            <div className="container-fluid">

                <div className="d-flex w-100 justify-content-between align-items-center">
                    <a className="navbar-brand fw-bold text-success" href="#">
                        GRP_12
                    </a>
                    <div className="d-block d-lg-none mt-2">
                        <Button type="primary" className="w-100">Đăng nhập</Button>
                    </div>

                </div>
                <div className="d-flex flex-grow-1 justify-content-center mt-2 mt-lg-0 ">
                    <Input placeholder="Search..." className="w-100 w-md-50 my-2"
                        prefix={<SearchOutlined/>}/>
                </div>

                <Button type="primary" className="d-none d-lg-block mx-2">
                    Đăng nhập
                </Button>
            </div>
        </nav>
    );
};

export default Header;
