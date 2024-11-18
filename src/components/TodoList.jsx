import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const TodoList = ({ todos, selectedIds, onSelect, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        No tasks yet. Add your first task above.
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          isSelected={selectedIds.includes(todo._id)}
          onSelect={onSelect}
          onEdit={onEdit}
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