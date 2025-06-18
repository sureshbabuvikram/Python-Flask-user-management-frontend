// src/services/api.js
import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:5000', // Flask backend URL
  // baseURL: 'https://python-flask-user-management-backend.onrender.com', // Flask backend URL
  baseURL: 'https://express-gateway-python-project.onrender.com', // Express-gateway URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
