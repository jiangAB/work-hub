import React, { useState, useEffect } from "react";
import type { MenuProps } from "antd";
import {  Layout, Menu, Button, Modal, message  } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { menuConfig, menuType } from "@/config/menu";
import styles from './index.module.scss'
import locale from "@/assets/locale";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | menuType[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function listurl(menuConfig: Array<menuType>): MenuItem[]{
  const menuArr = [];
  for(let i = 0; i < menuConfig.length; i++) {
    if(menuConfig[i].childrenMenuList.length) {
      menuArr[i] =(getItem(menuConfig[i].menuName, menuConfig[i].url, menuConfig[i].icon, listurl(menuConfig[i].childrenMenuList ))); 
    } else {
      menuArr[i] =(getItem(menuConfig[i].menuName, menuConfig[i].url, menuConfig[i].icon )); 
    }
  }
  return menuArr;
}

const items: MenuItem[] = listurl(menuConfig)
const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigateTo = useNavigate();
  const menuClick = (e: { key: string }) => {
    navigateTo(e.key);
  };
  

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // 本地存储中没有登录信息，跳转到登录页面
      navigateTo("/login");
    }
  }, [navigateTo]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.removeItem("isLoggedIn");
    message.success(locale.exitLoginSuccess)
    navigateTo("/login");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible={collapsed} collapsed={collapsed}>
        <div className={styles.demoLogoVertical} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/personnelmanage"]}
          items={items}
          onClick={menuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, width: "100%" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '22px' }} /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              height: 30,
            }}
          />
          <Button onClick={showModal} >{locale.exitLogin}</Button>
        </Header>
        <Content className={styles.main}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center", padding: "17px" }}>
          {/* Ant Design ©2023 Created by Ant UED */}
        </Footer>
      </Layout>
      <Modal title={locale.sureExitLogin} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
      </Modal>
    </Layout>
  );
};

export default View;