import axios from "axios"
const serviceApi = { 
    async getAllServiceByCategoryId(id, status) {
        const res = await axios.get(`/services/get-all-service-by-category-id-and-deleted?categoriesId=${id}&status=${status}`)
        return res.data
    },   
    async getAllServiceByDeleted(status) {
        const res = await axios.get(`/services?status=${status}`)
        return res.data
    },   
    async getServiceById(id) {
        const res = await axios.get(`/services/get-service-by-id?id=${id}`)
        return res.data
    },  
    async addService(data) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'post', url:`/services`, data,
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
    async updateServiceById(id, data) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/services/update?id=${id}`, data,
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
    async deleteServiceById(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'delete', url:`/services/delete?id=${id}`, 
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
    async activeServiceById(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/services/active?id=${id}`, 
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
export default serviceApi;
