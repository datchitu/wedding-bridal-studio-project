import axios from "axios"

const variantServiceApi = {
    async getAllVariantService(status, page) {
        const res = await axios.get(`/variant-services?status=${status}&offset=${page}&limit=100`)
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
    async addVariantService(data) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'post', url:`/variant-services`, data,
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- add category d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async updateVariantServiceById(id, data) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/variant-services/update?id=${id}`, data,
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- update category d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async deleteVariantServiceById(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'delete', url:`/variant-services/delete?id=${id}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- delete category d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async activeVariantServiceById(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/variant-services/active?id=${id}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- active category d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    }, 
};
export default variantServiceApi;
