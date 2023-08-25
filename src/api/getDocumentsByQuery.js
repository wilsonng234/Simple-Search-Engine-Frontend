import api from "api/axiosConfig";

const getDocumentsByQuery = async (query) => {
    return await api.get(
        `/api/v1/searchEngine?query=${encodeURIComponent(query)}`
    );
};

export default getDocumentsByQuery;
