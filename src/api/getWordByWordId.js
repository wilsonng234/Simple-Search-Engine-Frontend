import api from "./axiosConfig.js";

const getWordByWordId = async (wordId) => {
    try {
        return await api.get(`/api/v1/words?wordId=${wordId}`);
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export default getWordByWordId;
