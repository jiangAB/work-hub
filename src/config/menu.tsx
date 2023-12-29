import { DesktopOutlined } from "@ant-design/icons";
import locale from '@/assets/locale'

export type menuType = {
  menuName: React.ReactNode,
  url: React.Key,
  icon: React.ReactNode,
  childrenMenuList: menuType[]
}

export const menuConfig: Array<menuType> = [
  {
    icon: <DesktopOutlined />,
    menuName: locale.personnelManage,
    url: '/personnelmanage',
    childrenMenuList:[]
  },
  {
    icon: <DesktopOutlined />,
    menuName: locale.salaryManage,
    url: '/salarymanage',
    childrenMenuList:[]
  },
  {
    icon: <DesktopOutlined />,
    menuName: locale.departManage,
    url: '/departmanage',
    childrenMenuList:[]
  },
  /* {
    icon: <DesktopOutlined />,
    menuName: locale.positionManage,
    url: '/positionmanage',
    childrenMenuList:[]
  }, */
  /* {
    icon: <DesktopOutlined />,
    menuName: 'page',
    url: '/page',
    childrenMenuList:[
      {
        icon: null,
        menuName: 'page2',
        url: '/page2',
        childrenMenuList:[]
      },
      {
        icon: null,
        menuName: 'page3',
        url: '/page3',
        childrenMenuList:[]
      },
    ]
  } */
]