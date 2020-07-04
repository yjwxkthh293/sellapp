import axios from 'axios'

// export const baseURL = ' http://192.168.101.103:5000/'
export const baseURL = ' http://localhost:5000/'
// export const baseURL = ' http://172.20.10.4:5000/'



axios.defaults.baseURL = baseURL

// 1. 获取商品数据
export const Goods_List = () => axios.get("/goods/goods_list", { params: {} })
// 2. 获取商家
export const Seller = () => axios.get("/shop/seller", { params: {} })
// 3. 获取评价数据
export const Ratings = () => axios.get("/shop/ratings", { params: {} })

