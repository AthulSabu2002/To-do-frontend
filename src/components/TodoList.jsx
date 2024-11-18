import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const TodoList = ({ todos, selectedIds, onSelect, onEdit }) => {
  const [todoList, setTodoList] = useState(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const handleToggleComplete = async (id) => {
    const updatedTodo = todoList.find(todo => todo._id === id);
    updatedTodo.completed = !updatedTodo.completed;

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });
      setTodoList(todoList.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (todoList.length === 0) {
    return (
      <div className="empty-state">
        No tasks yet. Add your first task above.
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todoList.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          isSelected={selectedIds.includes(todo._id)}
          onSelect={onSelect}
          onEdit={onEdit}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoList;