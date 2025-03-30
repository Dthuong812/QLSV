import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import { getPostApi } from "../../services/API/PostApi";
import { Link } from "react-router-dom";

const PostNew = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await getPostApi();
        if (res.data && Array.isArray(res.data.posts)) {
          // Sắp xếp mới nhất theo createdAt (phòng trường hợp API không sắp xếp sẵn)
          const sortedPosts = res.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          const newestPosts = sortedPosts.slice(0, 5);
          setPosts(newestPosts);
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

  return (
    <Card title="📰 Bài viết mới nhất" className="shadow-sm m-4">
      {loading ? (
        <Spin />
      ) : posts.length > 0 ? (
        posts.map((item) => (
          <div
            key={item._id}
            className="d-flex align-items-center py-2 border-bottom"
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
          </div>
        ))
      ) : (
        <p className="text-center m-2">Không có bài viết nào.</p>
      )}
    </Card>
  );
};

export default PostNew;
