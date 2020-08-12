import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodosFilter.css';

export default class TodosFilter extends Component {
  static defaultProps = {
    filter: 'active',
    onFilterChange: () => {},
  };

  static propTypes = {
    filter: PropTypes.oneOf(['active', 'all', 'done']),
    onFilterChange: PropTypes.func,
  };

  btns = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const btns = this.btns.map(({ name, label }) => {
      const isActive = filter === name;
      const className = isActive ? 'selected' : '';

      return (
        <li key={name}>
          <button
            type="button"
            className={className}
            onClick={() => {
              onFilterChange(name);
            }}
          >
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{btns}</ul>;
  }
}
