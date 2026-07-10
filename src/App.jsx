import React, { Component } from 'react';
import WorldClockForm from './components/WorldClockForm';
import WorldClockList from './components/WorldClockList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: [
        // Для примера
        { id: 1, name: 'Москва', offset: 3 },
        { id: 2, name: 'Нью-Йорк', offset: -5 },
        { id: 3, name: 'Токио', offset: 9 },
      ],
    };
  }

  // Добавление новых часов
  handleAddClock = (name, offset) => {
    const newClock = {
      id: Date.now(),
      name,
      offset,
    };
    this.setState((prevState) => ({
      clocks: [...prevState.clocks, newClock],
    }));
  };

  // Удаление часов по id
  handleRemoveClock = (id) => {
    this.setState((prevState) => ({
      clocks: prevState.clocks.filter((clock) => clock.id !== id),
    }));
  };

  render() {
    const { clocks } = this.state;

    return (
      <div className="app">
        <h1>Мировые часы</h1>
        <WorldClockForm onAdd={this.handleAddClock} />
        <WorldClockList clocks={clocks} onRemove={this.handleRemoveClock} />
      </div>
    );
  }
}

export default App;