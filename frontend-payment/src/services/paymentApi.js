import axios from "axios";

const API_BASE = "http://localhost:3000/payment";

export const createPayment = (data) => axios.post(`${API_BASE}/process`, data);

export const getPaymentStatus = (id) => axios.get(`${API_BASE}/status/${id}`);

export const updatePayment = (id, data) => axios.put(`${API_BASE}/update/${id}`, data);

export const deletePayment = (id) => axios.delete(`${API_BASE}/cancel/${id}`);
