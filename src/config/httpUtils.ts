import axios from 'axios';

import { baseURL, timeout } from './env';
const $axios = axios.create({
  baseURL,
  timeout
})

export const post = (url: string, params?: object) => $axios.post(url, params);
export const get = (url: string, params?: object) => $axios.get(url, { params });
