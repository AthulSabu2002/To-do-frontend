import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const TodoList = ({ todos, selectedIds, onSelect, onEdit, onToggleComplete }) => {
  const [todoList, setTodoList] = useState(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

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
          onEdit={() => onEdit(todo)} 
          onToggleComplete={onToggleComplete}
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
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoList;