import axios from 'axios';
import { Config } from '~/constant/config';

const getToken = () => {
    return sessionStorage.getItem('token');
}

const instance = axios.create({
    baseURL: Config.apiBase,
    headers: { Authorization: getToken() },
});

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Do something with response data
        const data = response.data;
        if (response.status >= 200 && response.status < 300) {
            if (data.code || data.result) {
                if (data.result === 'success') {
                    return Promise.resolve(data.content);
                }
                return Promise.reject(data);
            } else {
                Promise.resolve(data);
            }
        }
    }
);
// 发送请求
export function getUserInfo() {
    return instance.get(`/user.json`);
}