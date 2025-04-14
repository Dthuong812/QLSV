import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Spin,
  Dropdown,
  Menu,
  Modal,
  Input,
  message,
  Upload,
  Button,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  deletePostApi,
  getPostApi,
  updatePostApi,
} from "../../services/API/PostApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PostNew = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { student } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null); // For image upload
  const baseUrl = "http://your-server.com"; // Replace with actual server URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await getPostApi();
        if (res.data && Array.isArray(res.data.posts)) {
          const validPosts = res.data.posts
            .filter((post) => post.forum && post.author) // Only keep valid posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(validPosts.slice(0, 5));
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Lỗi lấy posts:", error);
        message.error("Không thể tải bài viết!");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deletePostApi(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      message.success("Bài viết đã được xóa!");
    } catch (err) {
      console.error("Lỗi khi xóa bài viết:", err);
      message.error("Xóa bài viết thất bại!");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.content || "");
    setNewImage(null);
    setIsModalVisible(true);
  };

  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("content", newContent);
      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await updatePostApi(editingPost._id, formData);
      setPosts(
        posts.map((post) =>
          post._id === editingPost._id
            ? {
                ...post,
                title: newTitle,
                content: newContent,
                image: response.data.post.image || post.image,
              }
            : post
        )
      );
      setIsModalVisible(false);
      setNewImage(null);
      message.success("Bài viết đã được cập nhật!");
    } catch (err) {
      console.error("Lỗi khi cập nhật bài viết:", err);
      message.error("Cập nhật bài viết thất bại!");
    }
  };

  const handleImageChange = ({ file }) => {
    if (file && file.status !== "removed") {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        message.error("Vui lòng chọn file ảnh!");
        return;
      }
      if (!isLt5M) {
        message.error("Ảnh phải nhỏ hơn 5MB!");
        return;
      }
      setNewImage(file.originFileObj || file);
    } else {
      setNewImage(null);
    }
  };

  const menu = (post) => (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={() => handleEdit(post)}>
        Sửa
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(post._id)}
        danger
      >
        Xóa
      </Menu.Item>
    </Menu>
  );

  return (
    <Card title="📰 Bài viết mới nhất" className="shadow-sm m-4">
      {loading ? (
        <Spin />
      ) : posts.length > 0 ? (
        posts.map((item) => {
          const isAuthor = student?.id === item.author?._id;

          return (
            <div
              key={item._id}
              className="d-flex align-items-center justify-content-between py-2 border-bottom"
            >
              <div className="d-flex align-items-center">
                {/* Display image if available */}
                
                <div>
                  <Link
                    to={`/post/${item._id}`}
                    className="fw-bold text-primary d-block text-decoration-none"
                  >
                    {item.title}
                  </Link>
                  <small className="text-muted">
                    Tác giả: {item.author?.name || "Ẩn danh"} | Diễn đàn:{" "}
                    {item.forum?.title || "Không xác định"}
                  </small>
                </div>
              </div>
              {isAuthor && (
                <Dropdown overlay={menu(item)} trigger={["click"]}>
                  <MoreOutlined style={{ fontSize: 20, cursor: "pointer" }} />
                </Dropdown>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center m-2">Không có bài viết nào.</p>
      )}

      <Modal
        title="Cập nhật bài viết"
        open={isModalVisible}
        onOk={handleUpdatePost}
        onCancel={() => {
          setIsModalVisible(false);
          setNewImage(null);
        }}
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Tiêu đề bài viết"
          className="mb-3"
        />
        <Input.TextArea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Nội dung bài viết"
          rows={4}
          className="mb-3"
        />
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          onChange={handleImageChange}
          fileList={
            newImage ? [{ uid: "-1", name: newImage.name, status: "done" }] : []
          }
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh mới (tùy chọn)</Button>
        </Upload>
      </Modal>
    </Card>
  );
};

export default PostNew;