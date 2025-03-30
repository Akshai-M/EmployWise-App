// src/api.js
import axios from 'axios';

export const loginUser = async (email, password) => {
  const response = await axios.post('https://reqres.in/api/login', { email, password });
  return response.data;
};

export const fetchUsers = async (page) => {
  const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return response.data.data;
};

export const updateUser = async (id, user) => {
  await axios.put(`https://reqres.in/api/users/${id}`, user);
};

export const deleteUser = async (id) => {
  await axios.delete(`https://reqres.in/api/users/${id}`);
};