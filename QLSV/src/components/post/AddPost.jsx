import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { createPostApi } from "../../services/API/PostApi";
import { useNavigate } from "react-router-dom";

const AddPost = ({ forumId, onPostCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const postData = {
      title: values.title,
      content: values.content,
      forum: forumId,
    };
    try {
      const response = await createPostApi(postData);
      console.log("Phản hồi từ API (chi tiết):", response.data); // Log chi tiết

      // Lấy ID bài viết mới (điều chỉnh theo cấu trúc API thực tế)
      const newPostId = response.data.post?._id || response.data.newPostId || response.data.postId;
      if (!newPostId) {
        throw new Error("Không tìm thấy ID bài viết mới trong phản hồi API");
      }

      message.success("Tạo bài viết thành công!");
      onPostCreated({ ...postData, _id: newPostId });
      navigate(`/post/${newPostId}`);
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi tạo chủ đề:", error);
      message.error("Tạo chủ đề thất bại!");
    }
  };

  return (
    <div className="px-5 py-3 d-flex flex-grow-1 justify-content-end">
      <Button type="primary" onClick={showModal}>
        Thêm bài viết
      </Button>

      <Modal title="Tạo bài viết mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <Input.TextArea placeholder="Nhập nội dung (tùy chọn)" rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng bài
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPost;