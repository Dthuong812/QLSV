import axios from "../Axioscustum";
const getCommentApi = (id_post) => {
    return axios.get(`v1/comment/${id_post}`);
};
const postCommentApi = (postId, content, authorId) => {
    const accessToken = localStorage.getItem("accessToken"); // Lấy token từ localStorage

    return axios.post(`v1/comment`, { post: postId, content, author: authorId }, 
    {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Gửi token hợp lệ
            "Content-Type": "application/json",
        },
    });
};
export {
    getCommentApi,
    postCommentApi
}