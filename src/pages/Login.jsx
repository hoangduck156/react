import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validators';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    if (!validateEmail(values.email) || !validatePassword(values.password)) {
      message.error('Email hoặc mật khẩu không hợp lệ');
      return;
    }
    login(values.email);
    navigate('/home');
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">Đăng nhập</Button>
    </Form>
  );
}