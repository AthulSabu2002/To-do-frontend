
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onSelect, onEdit, isSelected }) => {
  return (
    <div className="todo-item">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(todo._id)}
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <div className="todo-actions">
        <button className="edit-btn" onClick={() => onEdit(todo)}>
          Edit
        </button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default TodoItem;

