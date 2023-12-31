/** 
 * 懒加载路由
 * */  
import { lazy } from 'react'

export const 
  Layout = lazy(() => import("@/views/Layout/Layout")),
  NotFound = lazy(() => import("@/components/NotFound")),
  PersonnelManage = lazy(() => import("@/views/PersonnelManage")),
  SalaryManage = lazy(() => import("@/views/SalaryManage")),
  DepartManage = lazy(() => import("@/views/DepartManage")),
  PositionManage = lazy(() => import("@/views/PositionManage")),
  Login = lazy(() =>import("@/views/Login"))