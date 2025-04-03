import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Spin } from "antd";
import { getPostByIdApi } from "../../services/API/PostApi";
import { getCommentApi } from "../../services/API/CommentApi";
import CommentShow from "../comment/CommentShow";
import CommentNew from "../comment/CommentNew";
import PostRelated from "./PostRelated"; // Import bài viết liên quan

const { Title, Paragraph } = Typography;

const PostShow = () => {
  const { id_post } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const postResponse = await getPostByIdApi(id_post);
        if (postResponse.data.success) {
          setPost(postResponse.data.post);
        } else {
          setPost(null);
        }

        const commentResponse = await getCommentApi(id_post);
        if (commentResponse.data.success) {
          setComments(commentResponse.data.comments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching post or comments:", error);
        setPost(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id_post]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (id_comment) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== id_comment)
    );
  };

  const handleEditComment = (id_comment, newContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === id_comment ? { ...comment, content: newContent } : comment
      )
    );
  };

  if (loading) return <Spin size="large" />;
  if (!post) return <p>Bài viết không tồn tại!</p>;

  return (
    <div className="d-flex p-5">
    <Card className="shadow-sm w-75 me-5 h-50">
    <Paragraph><strong>Diễn đàn:</strong> {post.forum.title}</Paragraph>
    <Title level={2}>{post.title}</Title>
    <Paragraph>{post.content}</Paragraph>
    <div className="mt-3">
      <Paragraph><strong>Tác giả:</strong> {post.author.name} ({post.author.email})</Paragraph>
      <Paragraph><strong>Ngày đăng:</strong> {new Date(post.createdAt).toLocaleString()}</Paragraph>

      <CommentShow
        comments={comments}
        onDeleteComment={handleDeleteComment}
        onEditComment={handleEditComment}
      />
      <CommentNew postId={id_post} onAddComment={handleAddComment} />
    </div>
  </Card>
  {/* Hiển thị bài viết liên quan */}
  <div className="w-25">
  <PostRelated postId={id_post} topicId={post.forum._id} />
  </div>
  </div>
  );
};

export default PostShow;
