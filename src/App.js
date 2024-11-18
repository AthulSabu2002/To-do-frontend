/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const newTodo = {
      text,
      completed: false
    };

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });
      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
      setText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEdit = (todo) => {
    
  };

  return (
    <div className="app">
      <AddTodoForm 
        text={text} 
        setText={setText} 
        handleSubmit={handleAddTodo} 
        isEditing={isEditing} 
      />
      <TodoList todos={todos} onEdit={handleEdit} />
    </div>
  );
};

export default App;