import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi, loginApi } from "../services/API/LoginApi"; 

const { Link } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginApi(values.email, values.password);
      message.success("Đăng nhập thành công!");
      localStorage.setItem("accessToken", response.data.accessToken); // Lưu token vào localStorage
      navigate("/"); // Chuyển hướng về trang chủ
    } catch (error) {
      message.error("Email hoặc mật khẩu không đúng!");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (values) => {
    try {
      setLoading(true);
      await forgotPasswordApi(values.email); 
      message.success(`Mã OTP đã được gửi tới ${values.email}`);
      navigate(`/forgot?email=${values.email}`); 
      message.error("Gửi mã OTP thất bại!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card title={forgotPassword ? "Quên mật khẩu" : "Đăng nhập"} className="shadow-sm" style={{ width: 350 }}>
        {forgotPassword ? (
          <Form layout="vertical" onFinish={handleForgotPassword}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input placeholder="Nhập email của bạn" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi yêu cầu đặt lại mật khẩu
            </Button>
            <Button type="link" onClick={() => setForgotPassword(false)} block>
              Quay lại đăng nhập
            </Button>
          </Form>
        ) : (
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>

            <div className="text-center mt-2">
              <Link onClick={() => setForgotPassword(true)}>Quên mật khẩu?</Link>
            </div>

            <div className="text-center mt-2">
              Chưa có tài khoản? <Link onClick={() => navigate("/register")}>Đăng ký ngay</Link>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Login;
