import React from "react";
import { Card, List } from "antd";
const topics = [
    {
      id: 1,
      title: "DVN Hanson Việt hóa – Font chữ đậm chất mạnh...",
      time: "Hôm nay lúc 08:37",

    },
    {
      id: 2,
      title: "Đảo ngược văn bản, chữ viết - Xu hướng mới...",
      time: "Hôm qua, lúc 22:52",

    },
    {
      id: 3,
      title: "DVN Minecraftory Việt hóa - Font chữ của game...",
      time: "Hôm qua, lúc 11:08",

    },
    {
      id: 4,
      title: "Paper-Like Wonders in Acrylic: Những Ảo Ảnh Vẽ...",
      time: "Chủ nhật 22:47",

    },
    {
      id: 5,
      title: "Luxurious Script Việt hóa - Font chữ thư pháp...",
      time: "Chủ nhật 20:35",

    },
  ];
const TopicList = () => {
    return (
        <Card title="Chủ đề mới" className="shadow-sm mt-4 w-25 me-4">
          <List
            itemLayout="horizontal"
            dataSource={topics}
            renderItem={(topic) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href="#" className="fw-bold text-dark">
                      {topic.title}
                    </a>
                  }
                  description={<span className="text-muted">{topic.time}</span>}
                />
              </List.Item>
            )}
          />
        </Card>
      );
    };
    

export default TopicList