import axios from "axios";
import { toast } from "react-toastify";

const client = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:3001",
});

client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // console.log('IP: ', await NetworkInfo.getIPAddress())

    return config;
  },
  (err) => Promise.reject("Interceptior logging the error : " + err)
);

client.interceptors.response.use(null, (err) => {
  const expectedErr =
    err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedErr) {
    toast.error(err.response.data.message);
  }

  return Promise.reject(err.response);
});

export { client };
