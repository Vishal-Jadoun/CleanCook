// import './DayColumn.css';

// function DayColumn({name,children}){
//     return (
//         <div className="day">
//             <h2>{name}</h2>
//            {children}
//         </div>
//     );
// }

// export default DayColumn;


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
