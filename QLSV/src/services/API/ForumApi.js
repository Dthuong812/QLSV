import axios from "../Axioscustum";
const getForumApi = () => {
    return axios.get("v1/forum/topics");
};

const createForumApi = (forumData) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);
  
    return axios.post(
      `v1/forum/topics`,
      {
        title: forumData.title,
        description: forumData.description,
        expireInHours: forumData.expireInHours,
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
    getForumApi,
    createForumApi
}