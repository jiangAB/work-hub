import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import locale from "@/assets/locale";
import { userLogin } from "@/api/server";
type FieldType = {
  username?: string;
  userpassword?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values: FieldType) => {
    userLogin(values).then((res) => {
      if (res.data === 1) {
        localStorage.setItem("isLoggedIn", "true");
        // 登录成功，重定向到另一个页面
        navigate("/"); // 重定向到 /dashboard 页面
        message.success(locale.login_success)
      } else {
        message.error(locale.errorLogin)
        // 处理登录失败的情况，可能显示错误消息等
      }
    });
  };
  return (
    <Form
      className={styles.loginForm}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label={locale.username}
        name="username"
        rules={[{ required: true, message: locale.pleasename }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={locale.password}
        name="userpassword"
        rules={[{ required: true, message: locale.pleasepassword }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {locale.login}
        </Button>
      </Form.Item>
    </Form>
  );
}
