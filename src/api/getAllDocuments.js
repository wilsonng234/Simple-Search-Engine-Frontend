import api from "./axiosConfig.js";

const getAllDocuments = async () => {
    try {
        return await api.get("/api/v1/documents/all");
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

export default getAllDocuments;
