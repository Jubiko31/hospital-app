import axios from 'axios';

const API = 'http://localhost:4001/';
export const getAll = async () => {
  const res = await axios.get(`${API}receptions`, {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  });
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API}/registration`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API}login`, data);
  const { token } = res.data;
  localStorage.setItem('token', token);

  return res.data;
};
