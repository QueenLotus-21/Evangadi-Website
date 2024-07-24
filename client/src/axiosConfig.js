import axios from 'axios';



 const axiosBase=axios.create({
    baseURL:'http://localhost:5600/api'
 })

 export default axiosBase;