import React, {useEffect, useRef, useState} from "react";
import {Button, Card} from "antd";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {getForumApi} from "../../services/API/ForumApi";

const ForumData = () => {
    const [forums, setForums] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const res = await getForumApi();
                setForums(res.data.forums);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách forum:", error);
            }
        };

        fetchForums();
    }, []);

    const handleScroll = (direction) => {
        const scrollAmount = 300;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? - scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="p-3">
            <div className="d-flex align-items-center gap-3 justify-content-center">
                <Button shape="circle"
                    icon={<ArrowLeftOutlined/>}
                    onClick={
                        () => handleScroll("left")
                    }/>

                <div ref={scrollRef}
                    className="d-flex gap-3 overflow-x-hidden "
                    style={
                        {
                            scrollBehavior: "smooth",
                            maxWidth: "83vw"
                        }
                }>
                    {
                    forums.map((forum) => (
                        <Card key={
                                forum._id
                            }
                            style={
                                {
                                    width: 200,
                                    minWidth: 200,
                                    height: 40,
                                    overflow: "hidden", 
                                    whiteSpace: "nowrap"
                                }
                            }
                            className="shadow-sm flex-shrink-0 d-flex align-items-center justify-content-center">
                            <p className="mb-0 small text-center">
                                {
                                forum.title
                            }</p>
                        </Card>
                    ))
                } </div>

                <Button shape="circle"
                    icon={<ArrowRightOutlined/>}
                    onClick={
                        () => handleScroll("right")
                    }/>
            </div>
        </div>
    );
};

export default ForumData;
