import axios from "axios";

const API_URL = "http://localhost:5000"; // adjust if deployed

// Mock login for placeholder - returns different roles based on email
const mockLogin = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Determine role based on email for placeholder
      let role = 'Student';
      if (data.email.includes('admin')) role = 'Admin';
      else if (data.email.includes('coach')) role = 'Coach';
      else if (data.email.includes('parent')) role = 'Parent';
      
      resolve({
        data: {
          user: {
            id: 1,
            name: data.email.split('@')[0],
            email: data.email,
            role: role,
          },
          token: 'mock-token-' + Date.now(),
        }
      });
    }, 500);
  });
};

export const loginApi = async (data) => {
  try {
    // Try real API first
    return await axios.post(`${API_URL}/api/auth/login`, data);
  } catch (error) {
    // Fallback to mock data if API fails
    console.log('Using mock login data');
    return await mockLogin(data);
  }
};

export const registerApi = async (data) => {
  try {
    // Try real API first
    return await axios.post(`${API_URL}/api/auth/register`, data);
  } catch (error) {
    // Fallback to mock data if API fails
    console.log('Using mock register data');
    return await mockLogin(data);
  }
};
