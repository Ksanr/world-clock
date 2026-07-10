import React, { useState } from 'react';
import PropTypes from 'prop-types';

const WorldClockForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [offset, setOffset] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const offsetNum = parseFloat(offset);

    if (!trimmedName) {
      alert('Введите название города');
      return;
    }
    if (isNaN(offsetNum)) {
      alert('Введите корректное смещение (число)');
      return;
    }

    onAdd(trimmedName, offsetNum);
    setName('');
    setOffset('');
  };

  return (
    <form className="clock-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cityName">Название</label>
        <input
          type="text"
          id="cityName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например, Москва"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="offset">Смещение (ч)</label>
        <input
          type="number"
          id="offset"
          value={offset}
          onChange={(e) => setOffset(e.target.value)}
          placeholder="Например, 3"
          step="0.5"
          required
        />
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};

WorldClockForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default WorldClockForm;