import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/todos';

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
  }
};