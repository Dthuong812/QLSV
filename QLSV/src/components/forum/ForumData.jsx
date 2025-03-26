import React from "react";
import { Card } from "antd";
const forumData = [
    {
      id: 1,
      title: "Coiny - Phông chữ vui nhộn và nổi bật cho thiết kế",
      user: "phamhaii",
      time: "10 phút trước",
 
    },
    {
      id: 2,
      title: "[Font Việt hóa] SVN-Futura Normal (14 fonts)",
      user: "nlququang",
      time: "10 phút trước",

    },
    {
      id: 3,
      title: "Trọn bộ font Acumin Pro Việt hóa - Font chữ thông dụng dành cho Designer",
      user: "myhanh141190",
      time: "Hôm nay lúc 10:05",

    },
  ];
const ForumData = () => {
    return (
        <Card title="Mới nhất" className="shadow-sm m-4">
          {forumData.map((item) => (
            <div key={item.id} className="d-flex align-items-center py-2 border-bottom">
              <div>
                <a href="#" className="fw-bold text-primary d-block">
                  {item.title}
                </a>
                <small className="text-muted">
                  Mới nhất: {item.user} · {item.time}
                </small>
              </div>
            </div>
          ))}
        </Card>
      );
    };
    
export default ForumData