import axios from "axios"
const serviceApi = { 
    async getAllServiceByCategoryId(id, status) {
        const res = await axios.get(`/services/get-all-service-by-category-id-and-deleted?categoriesId=${id}&status=${status}`)
        return res.data
    },   
};
export default serviceApi;
