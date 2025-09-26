import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validator';

export default function Register() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;

    if (!validateEmail(email)) {
      message.error('Email không hợp lệ');
      return;
    }

    if (!validatePassword(password)) {
      message.error('Mật khẩu phải có ít nhất 6 ký tự, gồm chữ và số');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email]) {
      message.error('Email đã được đăng ký');
      return;
    }

    users[email] = { password, todos: [] };
    localStorage.setItem('users', JSON.stringify(users));
    message.success('Đăng ký thành công!');

    navigate('/login');
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">Đăng ký</Button>
    </Form>
  );
}