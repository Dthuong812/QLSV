import axios from "../Axioscustum";
const getPostApi = () => {
    return axios.get("v1/post");
};
const getPostByIdApi = (id_post) => {
    return axios.get(`/v1/post/${id_post}`);
};
const createPostApi = (postData) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);
    return axios.post(`/v1/post`,{
        title: postData.title,
        description: postData.description,
        forum: postData.forum,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
export {
    getPostApi,
    getPostByIdApi,
    createPostApi
}