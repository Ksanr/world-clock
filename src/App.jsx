import React, { Component } from 'react';
import WorldClockForm from './components/WorldClockForm';
import WorldClockList from './components/WorldClockList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: [
        { id: 1, name: 'Москва', offset: 3 },
        { id: 2, name: 'Нью-Йорк', offset: -5 },
        { id: 3, name: 'Токио', offset: 9 },
      ],
      displayMode: 'digital', // 'digital' или 'analog'
    };
  }

  handleAddClock = (name, offset) => {
    const newClock = { id: Date.now(), name, offset };
    this.setState((prev) => ({
      clocks: [...prev.clocks, newClock],
    }));
  };

  handleRemoveClock = (id) => {
    this.setState((prev) => ({
      clocks: prev.clocks.filter((clock) => clock.id !== id),
    }));
  };

  toggleDisplayMode = () => {
    this.setState((prev) => ({
      displayMode: prev.displayMode === 'digital' ? 'analog' : 'digital',
    }));
  };

  render() {
    const { clocks, displayMode } = this.state;

    return (
      <div className="app">
        <div className="header">
          <h1 className="app-title">Мировые часы</h1>
          <button className="btn-primary" onClick={this.toggleDisplayMode}>
            {displayMode === 'digital' ? 'Аналоговые часы' : 'Цифровые часы'}
          </button>
        </div>

        <WorldClockForm onAdd={this.handleAddClock} />

        <WorldClockList
          clocks={clocks}
          onRemove={this.handleRemoveClock}
          displayMode={displayMode}
        />
      </div>
    );
  }
}

export default App;