import axios from "../Axioscustum";
const getPostApi = () => {
    return axios.get("v1/post");
};
const getPostByIdApi = (id_post) => {
    return axios.get(`/v1/post/${id_post}`);
};
export {
    getPostApi,
    getPostByIdApi
}