import './Planner.css';
import DayColumn from '../../components/DayColumn/DayColumn.jsx';
import PlannerSlot from '../../components/PlannerSlot/PlannerSlot.jsx';
function Planner() {
  return (
    <section id="planner-page" className="planner-page">
      <h1>Meal Planner</h1>

<div className="planner">
        
        {/* MONDAY */}
        <DayColumn dayName="monday">
          <PlannerSlot type="Breakfast" meal="Oats & Berries" />
          <PlannerSlot type="Lunch" meal="Butter Chicken" />
          <PlannerSlot type="Dinner" meal="+ Add meal" />
        </DayColumn>
        {/* TUESDAY */}
        <DayColumn dayName="tuesday">
          <PlannerSlot type="Breakfast" meal="Scrambled Eggs" />
          <PlannerSlot type="Lunch" meal="Butter Chicken" />
          <PlannerSlot type="Dinner" meal="+ Add meal" />
        </DayColumn>
        {/* WEDNESDAY */}
        <DayColumn dayName="wednesday">
          <PlannerSlot type="Breakfast" meal="Toast & Jam" />
          <PlannerSlot type="Lunch" meal="Dal Rice" />
          <PlannerSlot type="Dinner" meal="+ Add meal" />
        </DayColumn>
        {/* THURSDAY */}
        <DayColumn dayName="thursday">
          <PlannerSlot type="Breakfast" meal="+ Add meal" />
          <PlannerSlot type="Lunch" meal="+ Add meal" />
          <PlannerSlot type="Dinner" meal="+ Add meal" />
        </DayColumn>
        {/* FRIDAY */}
        <DayColumn dayName="friday">
          <PlannerSlot type="Breakfast" meal="+ Add meal" />
          <PlannerSlot type="Lunch" meal="Pasta Carbonara" />
          <PlannerSlot type="Dinner" meal="Tomato Soup" />
        </DayColumn>
        {/* SATURDAY */}
        <DayColumn dayName="saturday">
          <PlannerSlot type="Breakfast" meal="Paneer Paratha" />
          <PlannerSlot type="Lunch" meal="+ Add meal" />
          <PlannerSlot type="Dinner" meal="+ Add meal" />
        </DayColumn>
        {/* SUNDAY */}
        <DayColumn dayName="sunday">
          <PlannerSlot type="Breakfast" meal="+ Add meal" />
          <PlannerSlot type="Lunch" meal="+ Add meal" />
          <PlannerSlot type="Dinner" meal="+ Add meal" />
        </DayColumn>
      </div>

    </section>
  );
}

export default Planner;
