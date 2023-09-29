import axios from "axios"

const voucherApi = {
    async getAllVoucherByDeleted(status, page) {
        const res = await axios.get(`/vouchers?status=${status}&offset=${page}&limit=10`)
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

};
export default voucherApi;
