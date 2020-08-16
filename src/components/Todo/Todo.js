import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Todo.css';

export default class Todo extends Component {
  static defaultProps = {
    description: 'Some new task',
    date: new Date(),
    completed: false,
    onDeleted: () => {},
    onChecked: () => {},
    onEdit: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    onChecked: PropTypes.func,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { date, description } = props;
    this.state = {
      dateString: 'less than 5 seconds',
      isEdit: false,
      description,
      date,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleEditClick = () => {
    this.setState({ isEdit: true });
  };

  handleEditChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSubmit = (event) => {
    const { onEdit } = this.props;

    event.preventDefault();
    onEdit(event.target.firstChild.defaultValue);
    this.setState({
      isEdit: false,
      dateString: 'less than 5 seconds',
      date: new Date(),
    });
  };

  tick = () => {
    const { date } = this.state;

    this.setState({
      dateString: formatDistanceToNow(date, { includeSeconds: true }),
    });
  };

  render() {
    const { completed, onDeleted, onChecked } = this.props;
    const { description, dateString, isEdit } = this.state;

    const descriptionView = !isEdit ? (
      <span className="description">{description}</span>
    ) : (
      <form onSubmit={this.handleSubmit} className="editForm">
        <input value={description} className="editInput" onChange={this.handleEditChange} />
      </form>
    );

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onChecked} checked={completed} />
        <label>
          {descriptionView}
          <span className={clsx({ created: true }, { hidden: isEdit })}>{dateString} ago</span>
        </label>
        <button
          type="button"
          className={clsx('icon icon-edit', isEdit && 'hidden')}
          aria-label="Edit"
          onClick={this.handleEditClick}
        />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete" />
      </div>
    );
  }
}
