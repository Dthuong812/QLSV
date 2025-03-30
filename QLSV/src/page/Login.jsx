import React, { useContext, useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi, loginApi } from "../services/API/LoginApi"; 
import { AuthContext } from "../context/AuthContext";
const { Link } = Typography;

const Login = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
        const response = await loginApi(values.email, values.password);
        console.log("Response Data:", response.data);

        if (response?.data?.token && response?.data?.name) {
            const { token, name } = response.data;

            // Lưu vào localStorage
            localStorage.setItem("accessToken", token);
            localStorage.setItem("studentName", name);

            // Cập nhật vào context
            login(name, token);

            message.success(`Chào mừng ${name}!`);
            navigate("/");
        } else {
            message.error("Dữ liệu trả về không hợp lệ!");
        }
    } catch (error) {
        console.error("Login error:", error);
        message.error("Email hoặc mật khẩu không đúng!");
    }
    setLoading(false);
};
  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPasswordApi(values.email);
      message.success(`Mã OTP đã được gửi tới ${values.email}`);
      navigate(`/forgot?email=${values.email}`);
    } catch (error) {
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
