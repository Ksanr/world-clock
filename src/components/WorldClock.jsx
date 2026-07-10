import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnalogClock from './AnalogClock';

class WorldClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.getCurrentTime(),
    };
    this.timerId = null;
  }

  getCurrentTime() {
    const { offset } = this.props;
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + offset * 3600000);
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ time: this.getCurrentTime() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  formatTime(date) {
    return date.toLocaleTimeString('ru-RU', { hour12: false });
  }

  render() {
    const { name, id, onRemove, displayMode } = this.props;
    const { time } = this.state;

    return (
      <div className="clock-card">
        <button className="remove-btn" onClick={() => onRemove(id)}>✕</button>
        <div className="city-name">{name}</div>
        <div className="clock-display">
          {displayMode === 'digital' ? (
            <span className="digital-time">{this.formatTime(time)}</span>
          ) : (
            <AnalogClock time={time} />
          )}
        </div>
      </div>
    );
  }
}

WorldClock.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  displayMode: PropTypes.oneOf(['digital', 'analog']).isRequired,
};

export default WorldClock;