import React, { useEffect, useState, useContext } from "react";
import { Card, Spin, Dropdown, Menu, Modal, Input, message } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deletePostApi, getPostApi, updatePostApi } from "../../services/API/PostApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PostNew = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { student } = useContext(AuthContext); // Lấy user hiện tại
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await getPostApi();
        if (res.data && Array.isArray(res.data.posts)) {
          const sortedPosts = res.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts.slice(0, 5));
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Lỗi lấy posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Xác nhận xóa bài viết
  const handleDelete = async (postId) => {
    try {
      await deletePostApi(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Lỗi khi xóa bài viết:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.content);
    setIsModalVisible(true);
  };

  const handleUpdatePost = async () => {
    try {
      await updatePostApi(editingPost._id, newTitle, newContent);
      setPosts(posts.map((post) =>
        post._id === editingPost._id ? { ...post, title: newTitle, content: newContent } : post
      ));
      setIsModalVisible(false);
      message.success("Bài viết đã được cập nhật!");
    } catch (err) {
      console.error("Lỗi khi cập nhật bài viết:", err);
      message.error("Cập nhật bài viết thất bại.");
    }
  };
  const menu = (post) => (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={() => handleEdit(post)}>
        Sửa
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={() => handleDelete(post._id)} danger>
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
              <div>
                <Link
                  to={`/post/${item._id}`}
                  className="fw-bold text-primary d-block text-decoration-none"
                >
                  {item.title}
                </Link>
                <small className="text-muted">
                  Tác giả: {item.author?.name || "Ẩn danh"}
                </small>
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
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Tiêu đề bài viết"
        />
        <Input.TextArea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Nội dung bài viết"
          rows={4}
          className="mt-3"
        />
      </Modal>
    </Card>
  );
};

export default PostNew;
