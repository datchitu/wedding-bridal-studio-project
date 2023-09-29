import axios from "axios"

const transactionUserApi = { 
    async addTransactionUser(data) {
        try {
            const res = await axios.post(`transaction-users`,data )
            return res.data
        } catch (e) {
            console.log('--------------- add transaction user d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },

    async getAllTransactionUser(status, page) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'get', url:`/transaction-users?status=${status}&offset=${page}&limit=100`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- get all transaction user d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async getTransactionUserByTransactionIdAndUserId(transactionId, userId) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'get', url:`/transaction-users/get-transaction-user-by-transaction-id-and-user-id?transactionId=${transactionId}&userId=${userId}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- add transaction user d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async getTransactionUserByUserIdAndDeleted(userId, status) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'get', url:`/transaction-users/get-all-transaction-user-by-user-id-and-deleted?userId=${userId}&offset=0&limit=100&status=${status}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- add transaction user d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async updatePerformDate(id, performDatetime) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/transaction-users/update-perform-date?id=${id}&performDatetime=${performDatetime}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- update perform date d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async deleteTransactionUser(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'delete', url:`/transaction-users/delete?id=${id}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- delete transaction user d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
    async activeTransactionUser(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'put', url:`/transaction-users/active?id=${id}`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- active transaction user d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },
};
export default transactionUserApi;