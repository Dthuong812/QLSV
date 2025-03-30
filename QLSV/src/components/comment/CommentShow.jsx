import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List, Avatar, Spin, Typography } from "antd";
import { getCommentApi } from "../../services/API/CommentApi";

const { Title, Paragraph } = Typography;

const CommentShow = () => {
  const { id_post } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentApi(id_post);
        console.log("Response data:", response.data);

        if (response.data.success) {
          setComments(response.data.comments); // Lấy danh sách comment
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id_post]);

  if (loading) return <Spin size="large" />;
  if (comments.length === 0) return <p>Không có bình luận nào.</p>;

  return (
    <div className="mt-3">
      <Title level={3}>Bình luận</Title>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{comment.author.name.charAt(0)}</Avatar>}
              title={<b>{comment.author.name}</b>}
              description={comment.content}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentShow;
