

import React, { useState } from 'react';
import DayColumn from '../../components/DayColumn/DayColumn';
import PlannerSlot from '../../components/PlannerSlot/PlannerSlot';
import dummyMealPlan from '../../data/mealPlan';
import './Planner.css';

const Planner = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const daysOfWeek = Object.keys(dummyMealPlan);

  return (
    <div className="planner-container">
      <h1 className="planner-title">Weekly Planner</h1>
      
      <div className="days-row">
        {daysOfWeek.map(day => (
          <DayColumn 
            key={day} 
            dayName={day.charAt(0).toUpperCase() + day.slice(1)} 
            onClick={() => setSelectedDay(day)} 
            isActive={selectedDay === day}
          />
        ))}
      </div>

      {selectedDay && (
        <PlannerSlot 
          dayName={selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} 
          dayData={dummyMealPlan[selectedDay]} 
          onClose={() => setSelectedDay(null)} 
        />
      )}
    </div>
  );
};

export default Planner;
