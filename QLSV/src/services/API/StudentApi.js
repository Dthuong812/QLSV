import axios from "../Axioscustum";
const getStudentApi = () => {
    return axios.get("v1/student");
};

export {
    getStudentApi,
}