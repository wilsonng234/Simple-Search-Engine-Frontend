import api from "./axiosConfig.js";

const getTenWordByPrefix = async (prefix) => {
    try {
        return await api.get(
            `/api/v1/words/prefix?prefix=${(prefix)}`
        );
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export default getTenWordByPrefix;
