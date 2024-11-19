import './TodoItem.css';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onSelect, onEdit, isSelected, onToggleComplete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(todo._id)}
        />
        <span className="todo-text">{todo.text}</span>
        {todo.completed && <span className="completed-label">Completed</span>}
      </div>
      <div className="todo-actions">
        <button className="edit-btn" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button
          className="toggle-complete-btn"
          onClick={() => {
            console.log(`Toggling complete for ${todo._id} to ${!todo.completed}`);
            onToggleComplete(todo._id, !todo.completed);
          }}
        >
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
  isSelected: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoItem;

