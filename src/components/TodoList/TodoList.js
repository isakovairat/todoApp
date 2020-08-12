import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo';
import './TodoList.css';

const TodoList = ({ todoData, onDeleted, onChecked }) => {
  const elements = todoData.map((el) => {
    const { description, id, completed, date } = el;
    const className = completed ? 'completed' : 'active';

    return (
      <li key={id} className={className}>
        <Todo
          description={description}
          date={date}
          completed={completed}
          onDeleted={() => onDeleted(id)}
          onChecked={() => onChecked(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TodoList.defaultProps = {
  todoData: [],
  onDeleted: () => {},
  onChecked: () => {},
};

TodoList.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.number,
      completed: PropTypes.bool,
      date: PropTypes.instanceOf(Date),
    })
  ),
  onDeleted: PropTypes.func,
  onChecked: PropTypes.func,
};

export default TodoList;
