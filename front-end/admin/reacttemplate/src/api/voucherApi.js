import axios from "axios"

const voucherApi = {
    async getAllVoucherByDeleted(status, page) {
        const res = await axios.get(`/vouchers?status=${status}&offset=${page}&limit=100`)
        return res.data
    },
    
    async getVoucherById(id) {
        // const res = await axios.get(`/vouchers/get-voucher-by-id?id=${id}`).then((response) {console.log(response)})
        const res = await axios.get(`/vouchers/get-voucher-by-id?id=${id}`)
        return res.data
    },

    async getVoucherByCodeAndDeleted(code, status) {
        const res = await axios.get(`/vouchers/check-voucher-by-code?code=${code}&status=${status}`)
        return res.data
    },
    async addVoucher(data) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'post', url:`/vouchers`, data,
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- add voucher d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async updateVoucherById(id, data) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/vouchers/update?id=${id}`, data,
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
    async deleteVoucherById(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'delete', url:`/vouchers/delete?id=${id}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- delete voucher d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async activeVoucherById(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/vouchers/active?id=${id}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- active voucher d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
};
export default voucherApi;
