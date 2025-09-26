import './App.css';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { Layout, message } from 'antd';

// Cấu hình vị trí hiển thị message của Ant Design
message.config({
  top: 64, // px, tăng khoảng cách từ trên xuống để message không bị che
  duration: 2,
  maxCount: 3,
});

export default function App() {
  return (
    <AuthProvider>
      <Layout className="container">
        <AppRouter />
      </Layout>
    </AuthProvider>
  );
}