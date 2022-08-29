import axios from 'axios';

const API = 'http://localhost:4001/';
export const getAll = async () => {
  const { data } = await axios.get(`${API}receptions`, {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  });
  return data;
};

export const register = async (body) => {
  const { data } = await axios.post(`${API}/registration`, body);
  return data;
};

export const login = async (body) => {
  const { data } = await axios.post(`${API}login`, body);
  const { token } = data;
  localStorage.setItem('token', token);

  return data;
};
