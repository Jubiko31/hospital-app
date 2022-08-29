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

export const getDoctors = async () => {
  const { data } = await axios.get(`${API}doctors/`, {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  });

  return data;
};

export const addNewReception = async (body) => {
  try {
    const { data } = await axios.post(`${API}receptions`, body, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReception = async (id) => {
  try {
    const { data } = await axios.delete(`${API}receptions/${id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editReception = async (id, body) => {
  try {
    const { data } = await axios.patch(`${API}receptions/${id}`, body, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}