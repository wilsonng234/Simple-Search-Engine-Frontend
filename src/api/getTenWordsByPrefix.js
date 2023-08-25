import api from "api/axiosConfig";

const getTenWordsByPrefix = async (prefix) => {
    try {
        return await api.get(`/api/v1/words/prefix?prefix=${prefix}`);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default getTenWordsByPrefix;
