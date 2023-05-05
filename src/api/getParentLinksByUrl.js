import api from "./axiosConfig.js";

const getParentLinksByUrl = async (url) => {
    try {
        return await api.get(
            `/api/v1/parentLinks?url=${encodeURIComponent(url)}`
        );
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default getParentLinksByUrl;
