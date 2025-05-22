// client/src/api/authService.js

import axios from "axios";

const API_URL = "/api/auth";

const register = (username, email, password) => {
  return axios
    .post(`${API_URL}/register`, {
      username,
      email,
      password,
    })
    .then((response) => {
      // <--- THIS IS THE NEW PART
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
