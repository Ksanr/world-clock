import React from 'react';
import PropTypes from 'prop-types';
import WorldClock from './WorldClock';

const WorldClockList = ({ clocks, onRemove, displayMode }) => {
  return (
    <div className="clock-grid">
      {clocks.map((clock) => (
        <WorldClock
          key={clock.id}
          id={clock.id}
          name={clock.name}
          offset={clock.offset}
          onRemove={onRemove}
          displayMode={displayMode}
        />
      ))}
    </div>
  );
};

WorldClockList.propTypes = {
  clocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      offset: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  displayMode: PropTypes.oneOf(['digital', 'analog']).isRequired,
};

export default WorldClockList;