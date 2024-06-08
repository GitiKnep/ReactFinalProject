import axios from 'axios'

 const baseUrl="http://localhost:4000/user"
export const login_User=async(user)=>{
    const response = await axios.post(`${baseUrl}/login`,user)
    return response.data
}

export const add_User = async (newuser) =>{
    const response = await axios.post(baseUrl, newuser)
    return response.data
}

export const get_Users=async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

