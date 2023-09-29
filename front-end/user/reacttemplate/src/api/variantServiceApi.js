import axios from "axios"

const userApi = {
    async getAllVariantService(status, page) {
        const res = await axios.get(`/variant-services?status=${status}&offset=${page}&limit=4`)
        return res.data
    },
    // export const getAllVariantService = async (status, page) => {
    //     const res = await axios.get(`/variant-services?status=-1&offset=0&limit=5`)
    //     return res.data
    // }
    
    async getVariantServiceById(id) {
        const res = await axios.get(`/variant-services/get-variant-service-by-id?id=${id}`)
        return res.data
    },
    
    async getAllVariantServiceByServiceId(id, page, status){
        const res = await axios.get(`/variant-services/get-all-variant-service-by-service-id-and-deleted?servicesId=${id}&offset=${page}&limit=10&status=${status}`)
        return res.data
    },
    
    async searchVariantServiceByName(keyword, page, status) {
        const res = await axios.get(`/variant-services/search-variant-service-by-name-and-deleted?name=${keyword}&offset=${page}&limit=100&status=${status}`)
        return res.data
    },

};
export default userApi;
