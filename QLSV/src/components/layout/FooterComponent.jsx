import React from "react";
import {Layout} from "antd";
import {FacebookOutlined, TwitterOutlined, InstagramOutlined} from "@ant-design/icons";

const { Footer: AntFooter } = Layout; 

const FooterComponent = () => {
    return (
        <AntFooter className="bg-dark text-light text-center text-lg-start mt-5">
            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="fw-bold">Về Chúng Tôi</h5>
                        <p>
                            GRP_12 là diễn đàn nơi bạn có thể thảo luận, chia sẻ kiến thức và kết nối với mọi người.
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="fw-bold">Liên Kết</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="text-light text-decoration-none">Trang chủ</a>
                            </li>
                            <li>
                                <a href="#" className="text-light text-decoration-none">Diễn đàn</a>
                            </li>
                            <li>
                                <a href="#" className="text-light text-decoration-none">Tài khoản</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-12 mb-4">
                        <h5 className="fw-bold">Kết Nối Với Chúng Tôi</h5>
                        <div className="d-flex justify-content-center justify-content-lg-start">
                            <a href="#" className="text-light me-3 fs-4"><FacebookOutlined/></a>
                            <a href="#" className="text-light me-3 fs-4"><TwitterOutlined/></a>
                            <a href="#" className="text-light fs-4"><InstagramOutlined/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" text-center py-2">
                <small>© 2025 GRP_12. All Rights Reserved.</small>
            </div>
        </AntFooter>
    );
};


export default FooterComponent






