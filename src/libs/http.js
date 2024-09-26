import axios from "axios";
import { Cookies } from "react-cookie";

const http = axios.create({
    baseURL: "http://localhost:3000",
});


const cookies = new Cookies();

http.interceptors.request.use(
    function (config) {;
        const token = cookies.get("userToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default http;
