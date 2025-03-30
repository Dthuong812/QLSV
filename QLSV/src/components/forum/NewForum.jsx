import React, { useState } from "react";
import { Button, Modal, Form, Input, Tag, message } from "antd";

const NewForum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setTags([]);
    setInputTag("");
  };

  const handleAddTag = () => {
    if (inputTag.trim() && !tags.includes(inputTag.trim())) {
      setTags([...tags, inputTag.trim()]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const handleSubmit = (values) => {
    console.log("📝 Bài viết mới:", { ...values, tags });
    message.success("Đăng bài thành công!");
    handleCancel();
  };

  return (
    <div className="px-5 py-3 d-flex flex-grow-1 justify-content-end">
      <Button type="primary" onClick={showModal}>
        Thêm bài viết
      </Button>

      <Modal
        title="Tạo bài viết mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Thêm chủ đề">
            <Input
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onPressEnter={handleAddTag}
              placeholder="Nhập chủ đề "
            />
            <div className="mt-2">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ marginBottom: 8 }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Tiêu đề">
            <Input
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onPressEnter={handleAddTag}
              placeholder="Nhập tiêu đề "
            />
            <div className="mt-2">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ marginBottom: 8 }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label="Nội dung bài viết"
            name="caption"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Input.TextArea rows={3} placeholder="Viết gì đó..." />
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
