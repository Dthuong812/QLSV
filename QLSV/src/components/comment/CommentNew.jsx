import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, message } from "antd";
import { postCommentApi } from "../../services/API/CommentApi";

const { TextArea } = Input;

const CommentNew = ({ onCommentAdded }) => {
    const {postId } = useParams();
    // const { student } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
    if (!content.trim()) return message.error("Nội dung bình luận không được để trống");

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("id");

    console.log("🔍 Gửi request với:");
    console.log("Token:", token);
    console.log("User ID:", userId);
    console.log("Post ID:", postId);
    console.log("Nội dung:", content);

    setLoading(true);
    try {
        const response = await postCommentApi(postId, content);
        console.log("✅ Response từ server:", token);

        if (response.success) {
            message.success("Bình luận đã được thêm!");
            setContent("");
            onCommentAdded(); // Refresh danh sách bình luận
        } else {
            message.error(response.message || "Lỗi khi gửi bình luận!");
        }
    } catch (error) {
        console.error("❌ Lỗi khi gửi bình luận:", error);
        if (error.response) {
            console.error("Lỗi chi tiết:", error.response.data);
            message.error(error.response.data.message || "Lỗi server!");
        } else {
            message.error("Không thể kết nối đến server!");
        }
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="mt-3">
            <TextArea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập bình luận..."
            />
            <Button type="primary" className="mt-2" loading={loading} onClick={handleSubmit}>
                Gửi bình luận
            </Button>
        </div>
    );
};

export default CommentNew;
