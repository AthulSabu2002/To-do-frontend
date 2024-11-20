/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import DeleteButton from './components/DeleteButton';
import './App.css';
import { todoApi } from './services/todoApi';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      if (editingTodo) {
        const updatedTodo = await todoApi.updateTodo(editingTodo._id, text);
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
        setEditingTodo(null);
      } else {
        const savedTodo = await todoApi.addTodo(text);
        setTodos([...todos, savedTodo]);
      }
      setText('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setText(todo.text);
  };

  const handleDelete = async () => {
    try {
      await todoApi.deleteMany(selectedIds);
      setTodos(todos.filter((todo) => !selectedIds.includes(todo._id)));
      setSelectedIds([]);
    } catch (error) {
      console.error('Error deleting todos:', error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      console.log(`Calling API to toggle complete for ${id} to ${completed}`);
      const updatedTodo = await todoApi.toggleComplete(id, completed);
      console.log('API response:', updatedTodo);
      setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error toggling complete status:', error);
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="todo-container">
          <h1>Tasks</h1>
          <AddTodoForm
            text={text}
            setText={setText}
            handleSubmit={handleSubmit}
            isEditing={!!editingTodo}
          />
          <TodoList
            todos={todos}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onEdit={handleEdit}
            onToggleComplete={handleToggleComplete}
          />
          <DeleteButton
            selectedCount={selectedIds.length}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default App;
