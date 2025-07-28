import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `http://api.alquran.cloud/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
