import { createContext, useContext, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("Register status:", response.status);
    console.log("Register URL:", response.url);

    const text = await response.text();
    console.log("Register response:", text);

    if (!response.ok) {
      throw Error(text || "Registration failed.");
    }

    const result = JSON.parse(text);
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("Login status:", response.status);
    console.log("Login URL:", response.url);

    const text = await response.text();
    console.log("Login response:", text);

    if (!response.ok) {
      throw Error(text || "Login failed.");
    }

    const result = JSON.parse(text);
    setToken(result.token);
  };

  const logout = () => setToken(null);

  const value = {
    token,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be used within AuthProvider");
  }

  return context;
}
