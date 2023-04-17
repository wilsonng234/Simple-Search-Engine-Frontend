import api from "./axiosConfig.js";

const getDocumentsByQuery = async (query) => {
    try {
        return await api.get(
            `/api/v1/searchEngine?query=${encodeURIComponent(query)}`
        );
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export default getDocumentsByQuery;
