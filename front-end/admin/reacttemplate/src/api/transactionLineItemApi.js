import axios from "axios"

const transactionLineItemApi = { 
    async getAllTransactionLineItemByCartAndDeleted(deleted) {
        const res = await axios.get(`/transaction-line-items/get-all-transaction-line-item-by-empty-transaction-and-deleted?status=${deleted}`)
        return res.data
    },   

    async getTransactionLineItemByTransactionId(id, status) {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios.get(`/transaction-line-items/get-all-transaction-line-item-by-transaction-id-and-deleted?id=${id}&status=${status}`, {
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
    
    async deleteTransactionLineItemById(id) {
        // const res = await axios.delete(`/transaction-line-item/delete?id=${id}`).then((response) => {console.log(response)})
        const res = await axios.delete(`/transaction-line-items/delete?id=${id}`)
        return res.data
    },
    
    async updateQuantityTranasctionItemById(id, jsonData) {
        // const res = await axios.put(`/transaction-line-item?id=${id}`,jsonData).then((response) => {console.log(response)})
        const res = await axios.put(`/transaction-line-items?id=${id}`,jsonData)
        return res.data
    },

    async decrementQuantityTranasctionItemById(id) {
        try {
            const res = await axios.put(`/transaction-line-items/decrement?id=${id}`)
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

    async incrementQuantityTranasctionItemById(id) {
        try {
            const res = await axios.put(`/transaction-line-items/increment?id=${id}`)
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

};
export default transactionLineItemApi;
