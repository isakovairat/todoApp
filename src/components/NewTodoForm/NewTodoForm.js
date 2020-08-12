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
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { onItemAdded } = this.props;
    const { label } = this.state;

    event.preventDefault();
    onItemAdded(label);
    const input = event.target.querySelector('input');
    input.value = '';
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} />
      </form>
    );
  }
}
