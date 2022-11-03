import { Form, Input, Button, Checkbox, notification } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

function Login() {
  const router = useRouter();
  const [form1] = Form.useForm();

  const [cookies, setCookie] = useCookies(['isLoggedIn']);

  useEffect(() => {
    cookies.isLoggedIn && router.push('/');
  }, []);

  const openNotification = (message, description) => {
    notification.open({
      message,
      description,
    });
  };

  const onLogin = async ({ email, password, remember }) => {
    console.log(email, password, remember);
    try {
      await axios.post('/api/auth/login', {
        email,
        password,
      });
      setCookie('isLoggedIn', true, {
        path: '/',
        maxAge: remember ? 365 * 24 * 60 * 60 : 3600,
        sameSite: true,
      });
      router.push('/');
    } catch (error) {
      openNotification(error.message);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        flexDirection: 'column',
      }}
    >
      <Form
        form={form1}
        name="basic"
        onFinish={onLogin}
        autoComplete="off"
        style={{ width: '50%' }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Email is required!',
            },
          ]}
        >
          <Input type="email" size="large" placeholder={'Email'} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required!',
            },
          ]}
        >
          <Input.Password size="large" placeholder={'Password'} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Login!
        </Button>
      </Form>
    </div>
  );
}

export default Login;
