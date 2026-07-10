import React from 'react';
import PropTypes from 'prop-types';

const AnalogClock = ({ time }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Углы поворота стрелок (в градусах)
  const secondDeg = seconds * 6;                        // 360° / 60
  const minuteDeg = minutes * 6 + seconds * 0.1;       // 6° за минуту + 0.1° за секунду
  const hourDeg = (hours % 12) * 30 + minutes * 0.5 + seconds / 120;   // 30° за час + 0.5° за минуту + 0.00833° за секунду

  return (
    <svg viewBox="0 0 200 200" className="analog-clock">
      {/* Циферблат */}
      <circle cx="100" cy="100" r="90" fill="white" stroke="#333" strokeWidth="4" />
      {/* Часовая разметка */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 360;
        const x1 = 100 + 80 * Math.sin((angle * Math.PI) / 180);
        const y1 = 100 - 80 * Math.cos((angle * Math.PI) / 180);
        const x2 = 100 + 70 * Math.sin((angle * Math.PI) / 180);
        const y2 = 100 - 70 * Math.cos((angle * Math.PI) / 180);
        return (
          <line
            key={i}
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke="#333"
            strokeWidth="3"
          />
        );
      })}
      {/* Часовая стрелка */}
      <line
        x1="100" y1="100"
        x2={100 + 40 * Math.sin((hourDeg * Math.PI) / 180)}
        y2={100 - 40 * Math.cos((hourDeg * Math.PI) / 180)}
        stroke="#333"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Минутная стрелка */}
      <line
        x1="100" y1="100"
        x2={100 + 60 * Math.sin((minuteDeg * Math.PI) / 180)}
        y2={100 - 60 * Math.cos((minuteDeg * Math.PI) / 180)}
        stroke="#555"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Секундная стрелка */}
      <line
        x1="100" y1="100"
        x2={100 + 70 * Math.sin((secondDeg * Math.PI) / 180)}
        y2={100 - 70 * Math.cos((secondDeg * Math.PI) / 180)}
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Центральная точка */}
      <circle cx="100" cy="100" r="6" fill="#333" />
    </svg>
  );
};

AnalogClock.propTypes = {
  time: PropTypes.instanceOf(Date).isRequired,
};

export default AnalogClock;