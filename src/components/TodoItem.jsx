import './TodoItem.css';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onSelect, onEdit, onToggleComplete, isSelected }) => {
  return (
    <div className="todo-item">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(todo._id)}
        />
        <span className="todo-text">{todo.text}</span>
        {todo.completed && <span className="completed-label"> (Completed)</span>}
      </div>
      <div className="todo-actions">
        <button className="edit-btn" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button className="complete-btn" onClick={() => onToggleComplete(todo._id, !todo.completed)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default TodoItem;

