import axios from 'axios';
import { message } from 'antd';
import locale from '@/assets/locale';
import { baseURL, timeout } from './env';
const $axios = axios.create({
  baseURL,
  timeout
})

$axios.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么，比如添加公共的请求头
    config.headers['Apikey'] = '8IBeyF6le9yjvXAW';
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    const errorMessage = error.response?.data?.message || locale.pleaseCheckTheNetwork;
    message.error(errorMessage);
    return Promise.reject(error);
  }
);

export const post = (url: string, params?: object) => $axios.post(url, params);
export const get = (url: string, params?: object) => $axios.get(url, { params });
