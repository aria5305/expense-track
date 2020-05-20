import axios from 'axios'; 

const instance = axios.create({
    baseURL:'https://expense-tracker-67903.firebaseio.com/'
});


export default instance;