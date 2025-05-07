import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("feedback-user");
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const storedToken = localStorage.getItem("feedback-token");
      return storedToken && storedToken !== "undefined" ? storedToken : null;
    } catch (error) {
      console.error("Error parsing stored token:", error);
      return null;
    }
  });

  useEffect(() => {
    // This ensures if user data exists in localStorage on app load, we populate the context.
    const storedUser = localStorage.getItem("feedback-user");
    const storedToken = localStorage.getItem("feedback-token");
    if (storedUser && storedUser !== "undefined" && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    } else {
      console.log("User or Token missing");
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('feedback-user', JSON.stringify(userData));
    localStorage.setItem('feedback-token', token);
  };

  const logout = () => {
    setUser(null); // Clear user data
    setToken(null); // Clear token
    localStorage.removeItem('feedback-user');
    localStorage.removeItem('feedback-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to easily access context
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
