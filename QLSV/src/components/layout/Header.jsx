import React, {useContext} from "react";
import {Input, Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const {studentName} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
            <div className="container-fluid">
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <Link to={"/"}
                        className="navbar-brand fw-bold text-success">
                        GRP_12
                    </Link>

                    <div className="d-block d-lg-none mt-2">
                        {
                        studentName ? (
                            <div className="w-100">
                                {studentName} </div>
                        ) : (
                            <Button type="primary" className="w-100"
                                onClick={
                                    () => navigate("/login")
                            }>
                                Đăng nhập
                            </Button>
                        )
                    } </div>
                </div>

                <div className="d-flex flex-grow-1 justify-content-center mt-2 mt-lg-0">
                    <Input placeholder="Search..." className="w-100 w-md-50 my-2"
                        prefix={<SearchOutlined/>}/>
                    
                </div>
                <div className="d-flex d-lg-block mx-2 justify-content-end"
                        style={
                            {width: "200px"}
                    }>
                        {
                        studentName ? (
                            <div className="d-flex justify-content-end"
                                style={
                                    {width: "160px"}
                            }>
                                {studentName} </div>
                        ) : (
                            <Button type="primary"
                                onClick={
                                    () => navigate("/login")
                            }>
                                Đăng nhập
                            </Button>
                        )
                    } </div>

            </div>
        </nav>
    );
};

export default Header;
