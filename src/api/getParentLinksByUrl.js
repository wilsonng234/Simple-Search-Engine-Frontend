import api from "./axiosConfig.js";

const getParentLinksByUrl = async (url) => {
    try {
        return await api.get(`/api/v1/parentLinks?url=${url}`);
    } catch (error) {
        console.log(error);
    }
};

export default getParentLinksByUrl;
