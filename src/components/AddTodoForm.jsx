import PropTypes from 'prop-types';

const AddTodoForm = ({ text, setText, handleSubmit, isEditing }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button 
        className="primary-btn"
        onClick={handleSubmit}
      >
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </div>
  );
};
AddTodoForm.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AddTodoForm;