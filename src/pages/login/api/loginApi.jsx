import axios from "axios";

const API_URL = "http://localhost:5000"; // adjust if deployed

export const loginApi = (data) => axios.post(`${API_URL}/api/auth/login`, data);
export const registerApi = (data) => axios.post(`${API_URL}/api/auth/register`, data);
