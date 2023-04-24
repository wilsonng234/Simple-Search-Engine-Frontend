import api from "./axiosConfig.js";

const getDocumentsByQuery = async (query) => {
    return await api.get(
        `/api/v1/searchEngine?query=${encodeURIComponent(query)}`
    );
};

export default getDocumentsByQuery;
