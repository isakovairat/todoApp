import React, { Component } from 'react';
import Header from '../Header';
import NewTodoForm from '../NewTodoForm';
import TodoList from '../TodoList';
import Footer from '../Footer';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.id = 1;
    this.state = {
      todoData: [this.createItem('Completed task'), this.createItem('Editing task'), this.createItem('Active task')],
      filter: 'all', // active, all, done
    };
  }

  createItem = (description) => {
    this.id += 1;

    return {
      description,
      id: this.id,
      completed: false,
      date: new Date(),
    };
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((item) => item.id !== id),
      };
    });
  };

  onCheckedItem = (id) => {
    this.setState(({ todoData }) => {
      const checkedElement = todoData.find((el) => el.id === id);
      checkedElement.completed = !checkedElement.completed;
      return {
        todoData: [...todoData],
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createItem(text);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((item) => !item.completed),
      };
    });
  };

  getTodoActiveCount = (items) => {
    let counter = 0;

    items.forEach((el) => {
      if (!el.completed) {
        counter += 1;
      }
    });

    return counter;
  };

  onEdit = (id, newDescription) => {
    this.setState(({ todoData }) => {
      const editedElement = todoData.find((el) => el.id === id);
      editedElement.description = newDescription;
      return {
        todoData: [...todoData],
      };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'done':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);
    const todoCount = this.getTodoActiveCount(todoData);

    return (
      <section className="todoapp">
        <Header />
        <NewTodoForm onItemAdded={this.addItem} />
        <section className="main">
          <TodoList
            todoData={visibleItems}
            onDeleted={this.deleteItem}
            onChecked={this.onCheckedItem}
            onEdit={this.onEdit}
          />
          <Footer
            todoCount={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
