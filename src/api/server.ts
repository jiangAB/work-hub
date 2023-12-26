import { post, get } from "@/config/httpUtils";

// test
export const testPost = () => post('/users');
export const testGet = () => get('/users');

// 查询员工信息

export const getStaffInfo = (params?: object) =>  get('/staffInfo', params);

// 获取员工工资

export const getSalaryList = (params?: object) => get('/salary', params);