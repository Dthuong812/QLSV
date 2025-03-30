import axios from "../Axioscustum";
const getForumApi = () => {
    return axios.get("v1/forum/topics");
};

export {
    getForumApi,
}