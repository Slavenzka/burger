import axios from 'axios'

const axiosOrders = axios.create({
  baseURL: 'https://react-my-burger-b499f.firebaseio.com/'
})

export default axiosOrders
