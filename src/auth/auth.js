import { useContext } from "react";
import { AuthContext } from "./authContext";

// ✅ Custom hook that reads context
export const useAuth = () => useContext(AuthContext);
