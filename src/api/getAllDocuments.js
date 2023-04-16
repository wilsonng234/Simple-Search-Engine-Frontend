import api from "./axiosConfig.js";

const getAllDocuments = async () => {
    try {
        return await api.get("/api/v1/documents/all");
    } catch (error) {
        console.log(error);
    }
};

export default getAllDocuments;
