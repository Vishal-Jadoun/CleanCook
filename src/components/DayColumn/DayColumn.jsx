import React from 'react';
import './DayColumn.css';

const DayColumn = ({ dayName, onClick, isActive }) => {
  return (
    <button 
      className={`day-column ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      {/* <span className="day-abbr">{dayName.substring(0, 3)}</span> */}
      <span className="day-full">{dayName}</span>
    </button>
  );
};

export default DayColumn;
