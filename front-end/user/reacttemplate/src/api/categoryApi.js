import axios from "axios"



export const getAllCategory = async (status) => {
    const res = await axios.get(`/categories?status=${status}`)
    return res.data
}

export const getCategoryById = async (id) => {
    const res = await axios.get(`/categories/get-category-by-id?id=${id}`)
    return res.data
}   