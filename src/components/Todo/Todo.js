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
    onChecked: () => {},
    onDeleted: () => {},
    onEdit: () => {},
    seconds: 0,
  };

  static propTypes = {
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    onChecked: PropTypes.func,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    seconds: PropTypes.number,
  };

  constructor(props) {
    super(props);

    const { date, description, seconds } = props;
    this.state = {
      dateString: 'less than 5 seconds',
      isEdit: false,
      description,
      date,
      currentTime: seconds,
      isPaused: true,
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
    const { date, currentTime, isPaused } = this.state;
    let newCurrentTime;
    if (currentTime === 0) {
      newCurrentTime = 0;
    } else {
      newCurrentTime = isPaused ? currentTime : currentTime - 1;
    }

    this.setState({
      dateString: formatDistanceToNow(date, { includeSeconds: true }),
      currentTime: newCurrentTime,
    });
  };

  handlePlayClick = () => {
    this.setState({ isPaused: false });
  };

  handlePlayPause = () => {
    this.setState({ isPaused: true });
  };

  formatSecondsToTime = (seconds) => {
    const minutesToShow = Math.floor(seconds / 60);
    const secondsToShow = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    return `${minutesToShow}:${secondsToShow}`;
  };

  render() {
    const { completed, onDeleted, onChecked } = this.props;
    const { description, dateString, isEdit, currentTime } = this.state;

    const descriptionView = !isEdit ? (
      <span style={{ flexBasis: '45%' }} className="title">
        {description}
      </span>
    ) : (
      <form onSubmit={this.handleSubmit} className="editForm">
        <input value={description} className="editInput" onChange={this.handleEditChange} />
      </form>
    );

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onChecked} checked={completed} />
        <label style={{ display: 'flex' }}>
          {descriptionView}
          <button
            className={clsx('icon icon-play', isEdit && 'hidden')}
            onClick={this.handlePlayClick}
            aria-label="Play"
            type="button"
          />
          <button
            className={clsx('icon icon-pause', isEdit && 'hidden')}
            onClick={this.handlePlayPause}
            aria-label="Pause"
            type="button"
          />
          <span className={clsx({ description: true }, { hidden: isEdit })}>
            {this.formatSecondsToTime(currentTime)}
          </span>
          <span
            style={{ flexBasis: '37%', textAlign: 'right' }}
            className={clsx({
              description: true,
              created: true,
              hidden: isEdit,
            })}
          >
            {dateString} ago
          </span>
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
