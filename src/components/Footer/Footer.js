import React from 'react';
import PropTypes from 'prop-types';

import TodosFilter from '../TodosFilter';
import './Footer.css';

const Footer = ({ todoCount, filter, onFilterChange, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TodosFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  todoCount: 0,
  filter: 'active',
  onFilterChange: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  filter: PropTypes.oneOf(['active', 'all', 'done']),
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export default Footer;
