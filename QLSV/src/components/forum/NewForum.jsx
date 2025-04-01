import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { createForumApi } from "../../services/API/ForumApi";

const NewForum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const forumData = {
      title: values.title,
      description: values.description || "", // Nếu không nhập, gửi chuỗi rỗng
      expireInHours: values.expireInHours || 1, // Mặc định là 1 nếu không nhập
    };

    try {
      const response = await createForumApi(forumData);
      console.log("📝 Chủ đề mới:", forumData);
      console.log("Phản hồi từ server:", response.data);
      message.success("Tạo chủ đề thành công!");
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi tạo chủ đề:", error);
      message.error("Tạo chủ đề thất bại!");
    }
  };

  return (
    <div className="px-5 py-3 d-flex flex-grow-1 justify-content-end">
      <Button type="primary" onClick={showModal}>
        Thêm chủ đề
      </Button>

      <Modal
        title="Tạo chủ đề mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
    
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả (tùy chọn)" rows={3} />
          </Form.Item>


          <Form.Item
            label="Thời gian hết hạn (giờ)"
            name="expireInHours"
            rules={[
              { required: true, message: "Vui lòng nhập thời gian hết hạn!" },
              {
                type: "number",
                min: 1,
                message: "Thời gian phải lớn hơn 0!",
              },
            ]}
            normalize={(value) => Number(value)} 
          >
            <Input type="number" placeholder="Nhập số giờ" defaultValue={1} />
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

export default NewForum;