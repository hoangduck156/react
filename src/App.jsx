import './App.css';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { Layout } from 'antd';

export default function App() {
  return (
    <AuthProvider>
      <Layout className="container">
        <AppRouter />
      </Layout>
    </AuthProvider>
  );
}