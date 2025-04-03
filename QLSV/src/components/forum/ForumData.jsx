import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { getForumApi } from "../../services/API/ForumApi";
import { getPostApi } from "../../services/API/PostApi"; // API lấy bài viết
import { NavLink } from "react-router-dom";

const ForumData = ({ filterByAuthor }) => {
  const [forums, setForums] = useState([]);
  const [postCounts, setPostCounts] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [forumRes, postRes] = await Promise.all([getForumApi(), getPostApi()]);

        const forumsData = forumRes.data.forums || [];
        console.log("forumsData", forumsData);

        // Lọc forum theo filterByAuthor nếu có
        const filteredForums = filterByAuthor
          ? forumsData.filter(forum => forum.createdBy._id === filterByAuthor)
          : forumsData;

        const postsData = postRes.data.posts || [];
        console.log("postsData", postsData);

        const counts = postsData.reduce((acc, post) => {
          const forumId = post.forum._id;
          if (forumId) {
            acc[forumId] = (acc[forumId] || 0) + 1;
          }
          return acc;
        }, {});
        console.log(counts);

        setForums(filteredForums);
        setPostCounts(counts);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [filterByAuthor]);

  const handleScroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="mt-3">
      <div className="d-flex align-items-center gap-3 justify-content-center">
        <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={() => handleScroll("left")} />

        <div
          ref={scrollRef}
          className="d-flex gap-3 overflow-x-hidden overflow-y-hidden p-2"
          style={{ scrollBehavior: "smooth", maxWidth: "83vw" }}
        >
          {forums.length > 0 ? (
            forums.map((forum) => {
              const slug = forum._id;
              return (
                <NavLink to={`/forum/${slug}`} key={forum._id} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? "active-card" : "")}>
                  <div
                    className="card shadow-sm"
                    style={{ minWidth: "300px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title mb-2">{forum.title}</h5>
                      <p className="card-text text-muted mb-2">{forum.description}</p>
                      <p className="card-text small fw-bold">Bài viết: {postCounts[forum._id] || 0}</p>
                    </div>
                  </div>
                </NavLink>
              );
            })
          ) : (
            <p>Không có diễn đàn nào.</p>
          )}
        </div>

        <Button shape="circle" icon={<ArrowRightOutlined />} onClick={() => handleScroll("right")} />
      </div>
    </div>
  );
};

export default ForumData;
