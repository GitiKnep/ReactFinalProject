import axios from 'axios'

 const baseUrl="http://localhost:4000/product"
 export const get_Products = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

export const getById_Product = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const add_Product = async (newProduct) => {
    const response = await axios.post(baseUrl,newProduct)
    return response.data
}

export const update_Product= async (id,updatedProduct) => {
    const response = await axios.put(`${baseUrl}/${id}`,updatedProduct)
    return response.data
}
export const delete_Product=async(id)=>{
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

