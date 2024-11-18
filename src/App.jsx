import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import DeleteButton from './components/DeleteButton';
import { todoApi } from './services/todoApi';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    try {
      if (editingTodo) {
        const updatedTodo = await todoApi.updateTodo(editingTodo._id, text);
        setTodos(todos.map(todo => 
          todo._id === updatedTodo._id ? updatedTodo : todo
        ));
        setEditingTodo(null);
      } else {
        const newTodo = await todoApi.addTodo(text);
        setTodos([...todos, newTodo]);
      }
      setText('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setText(todo.text);
  };

  const handleDelete = async () => {
    try {
      await todoApi.deleteMany(selectedIds);
      setTodos(todos.filter(todo => !selectedIds.includes(todo._id)));
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
}

export default App;