import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  async function login(inputs) {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/auth/login",
      inputs
    );
    setCurrentUser(res.data.other);
    localStorage.setItem("token", res.data.token);
  }
  async function logout() {
    setCurrentUser(null);
    localStorage.removeItem("user");
  }
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
