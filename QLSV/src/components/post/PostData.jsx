import React, { useEffect, useState } from "react";
import { List, Card, Skeleton, Pagination } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getPostApi } from "../../services/API/PostApi";
import { getCommentApi } from "../../services/API/CommentApi";
import { Link } from "react-router-dom";

const PostData = ({ forumId, posts: propPosts }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (propPosts?.length > 0) {
      setPosts((prevPosts) => {
        const newPosts = propPosts.filter(
          (newPost) => !prevPosts.some((p) => p._id === newPost._id)
        );
        return [...newPosts, ...prevPosts]; // Giữ bài mới ở đầu danh sách
      });
      setLoading(false);
    }
  }, [propPosts]);

  useEffect(() => {
    if (!propPosts || propPosts.length === 0) {
      const fetchPostsWithComments = async () => {
        setLoading(true);
        try {
          const res = await getPostApi();
          let postList = res.data.posts || [];

          if (forumId) {
            postList = postList.filter((post) => post.forum?._id === forumId);
          }

          const postsWithComments = await Promise.all(
            postList.map(async (post) => {
              try {
                const commentRes = await getCommentApi(post._id);
                const commentCount = commentRes.data.total || 0;
                return { ...post, commentCount };
              } catch {
                return { ...post, commentCount: 0 };
              }
            })
          );

          setPosts(postsWithComments);
        } catch (err) {
          console.error("Lỗi khi lấy bài viết:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPostsWithComments();
    }
  }, [forumId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [forumId]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="m-4">
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : posts.length > 0 ? (
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
                  <span className="me-3">👤 {post.author?.name }</span>
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
      ) : (
        <p className="text-center">
          {forumId
            ? "Không có bài viết nào cho chủ đề này."
            : "Không có bài viết nào."}
        </p>
      )}
    </div>
  );
};

export default PostData;
