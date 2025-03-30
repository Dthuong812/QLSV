import React, { useEffect, useState } from "react";
import { List, Card, Skeleton, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getPostApi } from "../../services/API/PostApi";
import { getCommentApi } from "../../services/API/CommentApi";
import { Link } from "react-router-dom";

const PostData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchPostsWithComments = async () => {
      setLoading(true);
      try {
        const res = await getPostApi();
        const postList = res.data.posts || [];

        const postsWithComments = await Promise.all(
          postList.map(async (post) => {
            try {
              const commentRes = await getCommentApi(post._id);
              const commentCount =
                commentRes.data.total ||
                (commentRes.data.comments && commentRes.data.comments.length) ||
                0;
              return { ...post, commentCount };
            } catch {
              return { ...post, commentCount: 0 };
            }
          })
        );

        const sortedPosts = postsWithComments
          .sort((a, b) => b.commentCount - a.commentCount)
          .slice(0, 20); 

        setPosts(sortedPosts);
      } catch (err) {
        console.error("Lỗi khi lấy bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsWithComments();
  }, []);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="m-4">
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={paginatedPosts}
            renderItem={(post) => (
              <Card className="shadow-sm mb-3">
                <Link
                  to={`/post/${post._id}`}
                  className="fw-bold text-dark fs-5 d-block text-decoration-none"
                >
                  {post.title}
                </Link>
                <div className="text-muted">
                  <span className="me-3">👤 {post.author?.name || "Ẩn danh"}</span>
                  📅 {new Date(post.createdAt).toLocaleString()}{" "}
                  <span className="me-3">
                    <EyeOutlined className="me-1" /> {post.views || 0}
                  </span>{" "}
                  • 💬 {post.commentCount} bình luận
                </div>
              </Card>
            )}
          />
          <div className="d-flex justify-content-end mt-3">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={posts.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PostData;
