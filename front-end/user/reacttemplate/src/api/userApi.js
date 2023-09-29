import axios from "axios";
// import axiosClient from "./axiosClient";

const userApi = {

    async login(jsonData) {
        const res = await axios.post(`/login`,jsonData)
        // const res = await axios.put(`/transactions/payment`,jsonData)
        return res.data
    },
    
    async register(jsonData) {
        const res = await axios.post(`/users`,jsonData)
        // const res = await axios.put(`/transactions/payment`,jsonData)
        return res.data
    },
    
    async getDeltailUserByDeleted(status) {
        try {
            let access_token = localStorage.getItem('accessToken');
            let email = localStorage.getItem('email');
            if (!access_token) return [];
            const res = await axios.get(`/users/get-user-by-email-and-deleted?email=${email}&status=${status}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            return res.data

        } catch (e) {
            console.log('--------------- getProfile@Error ', e);
            if (e.response && e.response.status && e.response.status === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async changePassword(password, new_password) {
        try {
            let access_token = localStorage.getItem('accessToken');
            let email = localStorage.getItem('email');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/users/change-password?email=${email}&password=${password}&mewPassword=${new_password}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data

        } catch (e) {
            console.log('--------------- change password@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },

    async updateUser(data) {
        try {
            let access_token = localStorage.getItem('accessToken');
            let email = localStorage.getItem('email');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/users/update?email=${email}`, 
            data,
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data

        } catch (e) {
            console.log('--------------- change password@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },


};
export default userApi;
