import api from "./axiosConfig.js";

const postCrawlingRequest = async (url, pages) => {
    return await api.post(
        `/api/v1/crawler?url=${encodeURIComponent(url)}&pages=${pages}`
    );
};

export default postCrawlingRequest;
