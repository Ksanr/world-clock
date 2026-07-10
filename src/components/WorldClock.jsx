import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Компонент для отображения часов в конкретной временной зоне.
 * Обновляет время каждую секунду.
 */
class WorldClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.getCurrentTime(),
    };
    this.timerId = null;
  }

  // Вычисляет текущее время с учётом смещения
  getCurrentTime() {
    const { offset } = this.props;
    const now = new Date();
    // Получаем UTC-время в миллисекундах
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    // Прибавляем смещение (в часах) и создаём новый объект Date
    const cityTime = new Date(utc + offset * 3600000);
    return cityTime;
  }

  // Запускаем таймер при монтировании
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ time: this.getCurrentTime() });
    }, 1000);
  }

  // Очищаем таймер при размонтировании
  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  // Форматирование времени в ЧЧ:ММ:СС
  formatTime(date) {
    return date.toLocaleTimeString('ru-RU', { hour12: false });
  }

  render() {
    const { name, onRemove, id } = this.props;
    const { time } = this.state;

    return (
      <div className="world-clock">
        <div className="clock-info">
          <span className="city-name">{name}</span>
          <span className="clock-time">{this.formatTime(time)}</span>
        </div>
        <button className="remove-btn" onClick={() => onRemove(id)}>✕</button>
      </div>
    );
  }
}

WorldClock.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default WorldClock;