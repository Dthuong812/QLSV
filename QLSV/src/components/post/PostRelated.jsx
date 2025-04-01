import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, message } from "antd";
import { Link } from "react-router-dom";
import { getForumApi } from "../../services/API/PostApi"; 

const { Title, Paragraph } = Typography;

const PostRelated = ({ postId, topicId }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy bài viết liên quan theo chủ đề
  const fetchRelatedPosts = async () => {
    if (!topicId) {
      setRelatedPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Giả sử API chấp nhận topicId để lọc bài viết theo chủ đề
      const response = await getForumApi(topicId);
      console.log("Related posts response:", response);

      if (response.success) {
        // Lọc bài viết: cùng topicId và loại trừ postId hiện tại
        const filteredPosts = response.data.posts
          .filter((post) => {
            // Kiểm tra chủ đề của bài viết
            const postTopicId = post.forum?._id || post.topicId; // Tùy cấu trúc API
            return postTopicId === topicId && post._id !== postId;
          })
          .slice(0, 3); // Giới hạn 3 bài viết liên quan
        setRelatedPosts(filteredPosts);
      } else {
        message.error(response.message || "Không thể lấy bài viết liên quan!");
        setRelatedPosts([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy bài viết liên quan:", error);
      message.error(
        error.message || "Lỗi server khi lấy bài viết liên quan!"
      );
      setRelatedPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedPosts();
  }, [topicId, postId]); // Cập nhật khi topicId hoặc postId thay đổi

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  }

  if (relatedPosts.length === 0) {
    return (
      <div className="related-posts mt-5">
        <Title level={3}>Bài viết liên quan</Title>
        <p>Không có bài viết nào cùng chủ đề.</p>
      </div>
    );
  }

  return (
    <div className="related-posts mt-5">
      <Title level={3}>Bài viết liên quan</Title>
      <Row gutter={[16, 16]}>
        {relatedPosts.map((post) => (
          <Col xs={24} sm={12} md={8} key={post._id}>
            <Card
              hoverable
              cover={
                post.imageUrl ? (
                  <img
                    alt={post.title}
                    src={post.imageUrl}
                    style={{ height: 150, objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: 150,
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span>Không có hình ảnh</span>
                  </div>
                )
              }
            >
              <Link to={`/post/${post._id}`}>
                <Title level={4} ellipsis={{ rows: 1 }}>
                  {post.title}
                </Title>
                <Paragraph ellipsis={{ rows: 2 }}>
                  {post.description || "Không có mô tả"}
                </Paragraph>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostRelated;