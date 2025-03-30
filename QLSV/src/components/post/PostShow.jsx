import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Spin } from "antd";
import { getPostByIdApi } from "../../services/API/PostApi";
import CommentShow from "../comment/CommentShow";
import CommentNew from "../comment/CommentNew";

const { Title, Paragraph } = Typography;

const PostShow = () => {
  const { id_post } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostByIdApi(id_post);
        console.log("Response data:", response.data); 
             
      if (response.data.success) {
        setPost(response.data.post); 
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPost();
  }, [id_post]);

  if (loading) return <Spin size="large" />;
  if (!post) return <p>Bài viết không tồn tại!</p>;

  return (
    <Card className="m-5 shadow-sm">
      <Paragraph><strong>Diễn đàn:</strong> {post.forum.title}</Paragraph>
      <Title level={2}>{post.title}</Title>
      <Paragraph>{post.content}</Paragraph>
      <div className="">
      <Paragraph><strong>Tác giả:</strong> {post.author.name} ({post.author.email})</Paragraph>
      <Paragraph><strong>Ngày đăng:</strong> {new Date(post.createdAt).toLocaleString()}</Paragraph>
      <CommentShow></CommentShow>
      <CommentNew onCommentAdded={() => setRefresh(!refresh)}></CommentNew>
      </div>
    </Card>
  );
};

export default PostShow;
