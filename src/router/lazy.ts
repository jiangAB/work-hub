/** 
 * 懒加载路由
 * */  
import { lazy } from 'react'

export const 
  Layout = lazy(() => import("@/views/Layout/layout")),
  NotFound = lazy(() => import("@/components/NotFound")),
  PersonnelManage = lazy(() => import("@/views/PersonnelManage"))
