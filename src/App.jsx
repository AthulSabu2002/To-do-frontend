/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import DeleteButton from './components/DeleteButton';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);


  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };


  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      if (editingTodo) {

        const response = await fetch(`/api/todos/${editingTodo._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
        setEditingTodo(null);
      } else {

        const newTodo = {
          text,
          completed: false,
        };
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTodo),
        });
        const savedTodo = await response.json();
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
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/todos/${id}`, { method: 'DELETE' })
        )
      );
      setTodos(todos.filter((todo) => !selectedIds.includes(todo._id)));
      setSelectedIds([]);
    } catch (error) {
      console.error('Error deleting todos:', error);
    }
  };

  return (
    <div className="App">
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
        />
        <DeleteButton
          selectedCount={selectedIds.length}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
