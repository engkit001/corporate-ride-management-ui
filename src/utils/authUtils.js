// src/utils/authUtils.js
import { jwtDecode } from "jwt-decode";  // Correct way to import in Vite

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);  // Now using the correct function
    return decoded;
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
};
