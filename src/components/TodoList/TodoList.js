import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo';

const TodoList = ({ todoData, onDeleted, onChecked, onEdit }) => {
  const elements = todoData.map((el) => {
    const { description, id, completed, date, seconds } = el;
    const className = completed ? 'completed' : 'active';

    return (
      <li key={id} className={className}>
        <Todo
          seconds={seconds}
          description={description}
          date={date}
          completed={completed}
          onDeleted={() => onDeleted(id)}
          onChecked={() => onChecked(id)}
          onEdit={(newDescription) => onEdit(id, newDescription)}
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
  onEdit: () => {},
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
  onEdit: PropTypes.func,
};

export default TodoList;
