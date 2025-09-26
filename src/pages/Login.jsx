import { Form, Input, Button, message } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validator';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;
    if (!validateEmail(email) || !validatePassword(password)) {
      message.error('Email hoặc mật khẩu không hợp lệ');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[email] || users[email].password !== password) {
      message.error('Email hoặc mật khẩu không đúng');
      return;
    }
    login(email);
    navigate('/home');
  };

  return (
    <>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Email" name="email" rules={[{ required: true }]}> 
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}> 
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">Đăng nhập</Button>
      </Form>
      <div style={{ marginTop: 16 }}>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </div>
    </>
  );
}