import axios from "axios"

export const fetchProducts = async () => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products')
    return data
}

export const fetchModification = async (prod_id) => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products/get_mods', prod_id)
    return data
}