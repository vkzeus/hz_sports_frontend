import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Invalid user in storage:", e);
        return { isAuthenticated: false, role: "", name: "" };
      }
    }
    return { isAuthenticated: false, role: "", name: "" };
  });

  // 🔁 Sync to localStorage when user changes
  useEffect(() => {
    if (user?.isAuthenticated) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
