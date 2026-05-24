"use client"
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

export const fetchLPSPrices = async () => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/price/')
    return data
}

export const fetchFSPrices = async () => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/price/fs')
    return data
}

export const fetchSensorsPrices = async () => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/price/bdt_bfs')
    return data
}

export const sendContacts = async (form) => {
    const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/send/', form)
    return data
}

export const sendCart = async (form) => {
    const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/send/cart', form)
    return data
}