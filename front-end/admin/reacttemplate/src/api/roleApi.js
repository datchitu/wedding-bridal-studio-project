import axios from "axios"

const roleApi = { 
    async getAllRole() {
        try {
            let access_token = localStorage.getItem('accessToken');
            if (!access_token) return [];
            const res = await axios({method: 'get', url:`/roles`, 
                headers: {
                    'Authorization': 'Bearer ' + access_token}
             });
            return res.data
        } catch (e) {
            console.log('--------------- get role d@Error ', e);
            if (e.response && e.response.code && e.response.code === 401) {
            }
            return {
                status: 501,
                data: []
            }
        }
    }, 
};
export default roleApi;