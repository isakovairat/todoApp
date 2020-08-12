import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Todo extends Component {
  static defaultProps = {
    description: 'Some new task',
    date: new Date(),
    completed: false,
    onDeleted: () => {},
    onChecked: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onChecked: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateString: 'less than 5 seconds',
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { date } = this.props;

    this.setState({
      dateString: formatDistanceToNow(date, { includeSeconds: true }),
    });
  }

  render() {
    const { description, completed, onDeleted, onChecked } = this.props;
    const { dateString } = this.state;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onChecked} checked={completed} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{dateString} ago</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="Edit" />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete" />
      </div>
    );
  }
}
