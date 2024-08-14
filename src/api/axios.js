import axios from "axios";


let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://auth-system-server-vyt0.onrender.com/api';
} else {
  BASE_URL = 'http://localhost:3000/api';
}

console.log('process.env.NODE_ENV ', process.env.NODE_ENV);
console.log('BASE_URL ', BASE_URL);



export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL, 
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
});