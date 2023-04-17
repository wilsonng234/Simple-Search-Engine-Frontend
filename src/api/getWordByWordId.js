import api from "./axiosConfig.js";

const getWordByWordId = async (wordId) => {
    try {
        return await api.get(`/api/v1/words?wordId=${wordId}`);
    } catch (error) {
        console.log(error);
    }
};

export default getWordByWordId;
