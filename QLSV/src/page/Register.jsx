import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login"); // Chuyển hướng sang trang đăng nhập
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card title="Đăng ký tài khoản" className="shadow-sm" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish} initialValues={{
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          password: "123456"
        }}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

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
            Đăng ký
          </Button>

          <div className="text-center mt-2">
            Đã có tài khoản? <Link onClick={() => navigate("/login")}>Đăng nhập</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
