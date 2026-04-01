import axios from "axios"

export const fetchProducts = async () => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products')
    return data
}

export const fetchModification = async (prod_id) => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products/get_mods?prod_id=' + prod_id)
    return data
}

export const fetchStock = async () => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products/get_stock')
    return data
}