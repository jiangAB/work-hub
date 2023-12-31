import { Navigate } from "react-router-dom";
import { Layout, NotFound, PersonnelManage, SalaryManage, DepartManage, PositionManage, Login } from "./lazy"; // 懒加载路由
import React from "react";

// 路由切换加载页面
const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense>{comp}</React.Suspense>
  // <React.Suspense fallback={<Loading />}>{comp}</React.Suspense>
);

// 路由表
const routes = [
  {
    path: "/",
    element: <Navigate to="/personnelmanage" />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/personnelmanage",
        element: withLoadingComponent(<PersonnelManage />),
      },
      {
        path: "/salarymanage",
        element: withLoadingComponent(<SalaryManage />),
      },
      {
        path: "/departmanage",
        element: withLoadingComponent(<DepartManage />),
      },
      {
        path: "/positionmanage",
        element: withLoadingComponent(<PositionManage />),
      },
      {
        path: "/*",
        element: withLoadingComponent(<NotFound />),
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
/*  {
    path: "/home",
    element: withLoadingComponent(<Home />),
  },
  {
    path: "/about",
    element: withLoadingComponent(<About />),
  }, */
];

export default routes;
