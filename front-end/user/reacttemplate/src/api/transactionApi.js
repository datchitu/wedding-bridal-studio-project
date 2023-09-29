import axios from "axios"
const transactionApi = { 
    async getAllTransactionByStatus(status, page) {
        const res = await axios.get(`/transactions?status=${status}&offset=${page}&limit=5`)
        return res.data
    },
    
    async getTransactionByFalseStatus() {
        const res = await axios.get(`/transactions/get-transaction-by-false-status`)
        return res.data
    },

    async getTransactionByIdAndDeleted(id, status) {
        try {
            const res = await axios.get(`/transactions/get-transaction-by-id-and-deleted?id=${id}&status=${status}`)
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
    
    async setTotalPriceEmptyTransaction() {
        // const res = await axios.put(`/transactions/set-total-price-empty-transaction`).then((response) => {console.log(response)})
        const res = await axios.put(`/transactions/set-total-price-empty-transaction`)
        return res.data
    },
    
    async addVariantServiceToTransaction(jsonData) {
        // const res = await axios.post(`/transactions/add-to-transaction`,jsonData).then((response) => {console.log(response)})
        const res = await axios.post(`/transactions/add-to-transaction`,jsonData)
        return res.data
    },
    
    async orderTransaction(jsonData) {
        // const res = await axios.post(`/transactions/add-to-transaction`,jsonData).then((response) => {console.log(response)})
        const res = await axios.put(`/transactions/order`,jsonData)
        return res.data
    },
    
    async paymentTransaction(jsonData) {
        // const res = await axios.post(`/transactions/add-to-transaction`,jsonData).then((response) => {console.log(response)})
        const res = await axios.put(`/transactions/payment`,jsonData)
        return res.data
    },

    async deleteTranasction(id) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios.delete(`/transactions/delete?id=${id}`, {
                headers: {
                    authorization: `Bearer ${access_token}`
                }
            })
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
    async updateTransaction(id, note) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios.put(`/transactions/update?id=${id}&note=${note}`, {
                headers: {
                    authorization: `Bearer ${access_token}`
                }
            })
            return res.data
        } catch (e) {
            console.log('--------------- payment @Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    },

};
export default transactionApi;
