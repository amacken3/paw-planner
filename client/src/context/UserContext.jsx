import { createContext, useContext, useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/check_session`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUser(null);
    } finally {
      setIsCheckingSession(false);
    }
  }

  async function login(formData) {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed.");
    }

    setUser(data);
    return data;
  }

  async function signup(formData) {
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Signup failed.");
    }

    setUser(data);
    return data;
  }

  async function logout() {
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Logout failed.");
    }

    setUser(null);
  }

  const value = {
    user,
    setUser,
    isCheckingSession,
    login,
    signup,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}