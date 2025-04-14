import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createPostApi } from "../../services/API/PostApi";

const AddPost = ({ forumId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const postData = new FormData();
    postData.append("title", values.title);
    postData.append("content", values.content || "");
    postData.append("forum", forumId);

    if (values.image?.file?.originFileObj) {
      postData.append("image", values.image.file.originFileObj);
    }

    try {
      const response = await createPostApi(postData);
      const newPostId = response.data.post?._id;

      if (!newPostId) throw new Error("Không có ID");

      message.success("Tạo bài viết thành công!");
      navigate(`/post/${newPostId}`);
      handleCancel();
    } catch (err) {
      message.error("Tạo bài viết thất bại!");
    }
  };

  return (
    <div className="px-5 py-3 d-flex flex-grow-1 justify-content-end">
      <Button type="primary" onClick={showModal}>Thêm bài viết</Button>
      <Modal title="Tạo bài viết mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <Input.TextArea rows={3} placeholder="Nhập nội dung (tùy chọn)" />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Đăng bài</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPost;
