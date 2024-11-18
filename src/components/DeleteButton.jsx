
import PropTypes from 'prop-types';

const DeleteButton = ({ selectedCount, onDelete }) => {
  if (selectedCount === 0) return null;
  
  return (
    <button 
      className="delete-btn"
      onClick={onDelete}
    >
      Delete Selected ({selectedCount})
    </button>
  );
};

DeleteButton.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
