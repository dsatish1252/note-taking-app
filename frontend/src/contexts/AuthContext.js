import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const register = async (username, email, password) => {
    const user = await authService.register(username, email, password);
    setCurrentUser(user.data); // Adjust based on your API response
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
