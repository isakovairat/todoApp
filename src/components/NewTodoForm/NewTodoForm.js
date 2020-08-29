import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTodoForm.css';

export default class NewTodoForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func,
  };

  state = {
    label: '',
    minutes: 0,
    seconds: 0,
  };

  handleSubmit = (event) => {
    const { onItemAdded } = this.props;
    const { label, minutes, seconds } = this.state;
    const transformedSeconds = Number(minutes) * 60 + Number(seconds);
    onItemAdded(label, transformedSeconds);
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    inputs.forEach((input) => {
      const newInput = input;
      newInput.value = '';
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.handleSubmit}>
        <input className="new-todo" type="text" name="label" placeholder="Task" onChange={this.handleChange} />
        <input
          className="new-todo-form__timer"
          type="text"
          name="minutes"
          placeholder="Min"
          onChange={this.handleChange}
        />
        <input
          className="new-todo-form__timer"
          type="text"
          name="seconds"
          placeholder="Sec"
          onChange={this.handleChange}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    );
  }
}
