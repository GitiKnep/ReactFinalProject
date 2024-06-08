import axios from "axios";

const baseUrl = "http://localhost:4000/order"

export const get_Orders = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

export const getById_Order = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const add_Order = async (newOrder) => {
    const response = await axios.post(baseUrl,newOrder)
    return response.data
}

export const delete_Order= async (id)=>{
    const response = await axios.delete(baseUrl+'/'+id)
    return response.data
}