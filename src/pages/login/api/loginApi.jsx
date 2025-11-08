import axios from "axios";

const API_URL = "https://hz-sports-backend-2.onrender.com"; // adjust if deployed

export const loginApi = (data) => axios.post(`${API_URL}/api/auth/login`, data);
export const registerApi = (data) => axios.post(`${API_URL}/api/auth/register`, data);
