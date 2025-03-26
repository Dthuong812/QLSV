import React from "react";
import { Card, Avatar, List } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const posts = [
    {
      id: 1,
      title: "Đảo ngược văn bản, chữ viết - Xu hướng mới trong thiết kế sáng tạo",
      author: "DesignerPlus",
      time: "Hôm qua, lúc 22:52",
      views: 32,
      avatar: "https://via.placeholder.com/40",
      excerpt: "Một thiết kế sáng tạo là sự kết hợp giữa nội dung văn bản thu hút và các yếu tố hình ảnh bắt mắt...",
    },
    {
      id: 2,
      title: "[Font Việt hóa] SVN-Futura Normal (14 fonts)",
      author: "nlpquang",
      time: "10 phút trước",
      views: 50,
      avatar: "https://via.placeholder.com/40",
      excerpt: "Bộ font chữ chuyên nghiệp, phù hợp với nhiều phong cách thiết kế hiện đại...",
    },
    {
      id: 3,
      title: "Trọn bộ font Acumin Pro Việt hóa - Font chữ thông dụng dành cho Designer",
      author: "myhanh141190",
      time: "Hôm nay lúc 10:05",
      views: 120,
      avatar: "https://via.placeholder.com/40",
      excerpt: "Font chữ được nhiều nhà thiết kế sử dụng, hỗ trợ tiếng Việt đầy đủ...",
    },
  ];
const PostData = () => {
    return (
        <List
          className="m-4 w-75"
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(post) => (
            <Card className="shadow-sm mb-3">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <a href="#" className="fw-bold text-dark fs-5 d-block">
                    {post.title}
                  </a>
                  <p className="text-muted mb-2">{post.excerpt}</p>
                  <div className="d-flex align-items-center text-muted">
                    <span className="me-3">👤 {post.author}</span>
                    <span className="me-3">📅 {post.time}</span>
                    <span>
                      <EyeOutlined className="me-1" /> {post.views}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        />
      );
    };
export default PostData