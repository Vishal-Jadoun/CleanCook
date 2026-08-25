import React from 'react';
import './DayColumn.css';

const DayColumn = ({ dayName, onClick, isActive }) => {
  return (
    <button className={`daycolumn ${isActive ? 'active' : ''}`} onClick={onClick}>
      <span className="displayname">{dayName}</span>
    </button>
  );
};

export default DayColumn;
