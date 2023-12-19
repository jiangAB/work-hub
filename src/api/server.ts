import { post, get } from "@/config/httpUtils";

// test
export const testPost = () => post('/users');
export const testGet = () => get('/users');

// 查询员工信息

export const getStaffInfo = (params?: object) =>  get('/staffInfo', params);