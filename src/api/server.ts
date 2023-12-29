import { post, get } from "@/config/httpUtils";

// test
export const testPost = () => post('/users');
export const testGet = () => get('/users');

export const userLogin = (params?: object) => post('/userLogin', params)
// 查询员工信息
export const getStaffInfo = (params?: object) =>  get('/staff', params);

// 新增员工信息
export const addStaffInfo = (params?: object) => post('/addStaff', params)
// 修改员工信息
export const updateStaffInfo = (params?: object) => post('/updateStaff', params);
// 删除员工信息
export const deleteStaffInfo = (params?: object) => post('/deleteStaff', params)
// 获取部门信息
export const getDepartment = () => get('/department');
// 更新部门信息
export const updateDepartment = (parmas?: object) => post('/updateDepartment', parmas)
// 删除部门信息
export const deleteDepart = (params?: object) => post('/deleteDepart', params)
// 新增部门信息
export const addDeparts = (params?: object) => post('/addDepart', params)
// 获取职位信息
export const getPositions = () => get('/positions')
// 更新职位信息
export const updatePosition = (parmas?: object) => post('/updatePosition', parmas)
// 新增职位信息
export const addPositions = (params?: object) => post('/addPosition', params)
// 删除部门信息
export const deletePosition = (params?: object) => post('/deletePosition', params)
// 获取员工工资
export const getSalaryList = (params?: object) => get('/salary', params);
// 更新员工工资
export const updateSalary = (params?: object) => post('/upDateSalary',params)