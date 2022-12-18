import axios from "axios";
import bcrypt from "bcryptjs";

const API_URL = "https://127.0.0.1:8000/api";

const encryptPassword = (password) => {
  // Generate salt for the bcrypt hash
  const salt = bcrypt.genSaltSync(10);
  // Hash the password using the salt
  const hash = bcrypt.hashSync(password, salt);
  // Return the encrypted password
  return hash;
}

const signup = (email, password) => {
  const encryptedPassword = encryptPassword(password);

  return axios
      .post(API_URL + "/users", {
        email: email,
        password: encryptedPassword,
      });
};

const login = (email, password) => {
  return axios
      .post(API_URL + "/login_check", {
        username: email,
        password: password,
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

const checkSessionExpired = (error) => {
  if (error.response && error.response.status === 401) {
    logout();
  }
}

const parseJwt = () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(window.atob(base64));
}

const isAdmin = () => {
  const user = getCurrentUser();

  if (user) {
    const roles = parseJwt().roles;

    return roles.includes('ROLE_ADMIN');
  }

  return false;
}

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  checkSessionExpired,
  parseJwt,
  isAdmin,
};

export default authService;
