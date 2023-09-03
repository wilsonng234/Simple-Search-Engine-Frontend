import api from "api/axiosConfig";

const postCrawlingRequest = async (url, pages) => {
    let endpoint = `/api/v1/crawler?`;
    if (url !== "") {
        endpoint += `url=${encodeURIComponent(url)}&`;
    }
    if (pages !== "") {
        endpoint += `pages=${pages}`;
    }

    return await api.post(endpoint);
};

export default postCrawlingRequest;
