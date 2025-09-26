import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Tự động lấy user từ localStorage nếu có
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email] && users[email].password === password) {
      const currentUser = { email };
      setUser(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);