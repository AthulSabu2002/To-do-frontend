import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const todoApi = {
  fetchTodos: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  addTodo: async (text) => {
    const response = await axios.post(BASE_URL, { text });
    return response.data;
  },

  updateTodo: async (id, text) => {
    const response = await axios.put(`${BASE_URL}/${id}`, { text });
    return response.data;
  },

  deleteMany: async (ids) => {
    await axios.post(`${BASE_URL}/deleteMany`, { ids });
  },

  toggleComplete: async (id, completed) => {
    console.log(`Sending PUT request to ${BASE_URL}/${id} with completed: ${completed}`);
    const response = await axios.put(`${BASE_URL}/${id}`, { completed });
    console.log('API response data:', response.data);
    return response.data;
  }
};