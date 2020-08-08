import Axios from 'axios';

const axiosInstance =  Axios.create({
    baseURL: 'https://my-burger-react-b4859.firebaseio.com/'
});

export default axiosInstance