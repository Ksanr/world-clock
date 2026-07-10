import React from 'react';
import PropTypes from 'prop-types';
import WorldClock from './WorldClock';

const WorldClockList = ({ clocks, onRemove }) => {
  return (
    <div className="clock-list">
      {clocks.map((clock) => (
        <WorldClock
          key={clock.id}
          id={clock.id}
          name={clock.name}
          offset={clock.offset}
          onRemove={onRemove}
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
};

export default WorldClockList;