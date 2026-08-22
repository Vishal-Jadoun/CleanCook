// import React, { useState } from 'react';
// import DayColumn from '../../components/DayColumn/DayColumn';
// import PlannerSlot from '../../components/PlannerSlot/PlannerSlot';
// import './Planner.css';

// // Mock data: Includes meals (for grocery list) AND totalNutrients (for the tracker)
// const MOCK_DATA = {
//   Monday: {
//     totalNutrients: { calories: 2340, protein: 120, fat: 60, carbs: 285 },
//     meals: {
//       breakfast: { name: "Avocado Toast", ingredients: ["Bread", "Avocado"] },
//       lunch: { name: "Chicken Salad", ingredients: ["Chicken Breast", "Lettuce", "Tomatoes"] },
//       dinner: { name: "Spaghetti Bolognese", ingredients: ["Pasta", "Ground Beef", "Tomato Sauce"] }
//     }
//   },
//   Tuesday: { totalNutrients: { calories: 2100, protein: 110, fat: 55, carbs: 250 }, meals: {} },
//   Wednesday: { totalNutrients: { calories: 2200, protein: 115, fat: 58, carbs: 260 }, meals: {} },
//   Thursday: { totalNutrients: { calories: 2400, protein: 125, fat: 65, carbs: 290 }, meals: {} },
//   Friday: { totalNutrients: { calories: 2350, protein: 122, fat: 62, carbs: 280 }, meals: {} },
//   Saturday: { totalNutrients: { calories: 2500, protein: 130, fat: 70, carbs: 300 }, meals: {} },
//   Sunday: { totalNutrients: { calories: 2450, protein: 128, fat: 68, carbs: 295 }, meals: {} },
// };

// const Planner = () => {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [showGroceryList, setShowGroceryList] = useState(false);

//   const daysOfWeek = Object.keys(MOCK_DATA);

//   const generateGroceryList = () => {
//     let allIngredients = [];
//     Object.values(MOCK_DATA).forEach(day => {
//       Object.values(day.meals).forEach(meal => {
//         if (meal.ingredients) {
//           allIngredients = [...allIngredients, ...meal.ingredients];
//         }
//       });
//     });
//     return [...new Set(allIngredients)];
//   };

//   const groceryList = generateGroceryList();

//   return (
//     <div className="planner-container">
//       <h1 className="planner-title">Weekly Planner</h1>
      
//       <div className="days-row">
//         {daysOfWeek.map(day => (
//           <DayColumn 
//             key={day} 
//             dayName={day} 
//             onClick={() => setSelectedDay(day)} 
//             isActive={selectedDay === day}
//           />
//         ))}
//       </div>

//       <button className="generate-grocery-btn" onClick={() => setShowGroceryList(true)}>
//         🛒 Generate Weekly Grocery List
//       </button>

//       {selectedDay && (
//         <PlannerSlot 
//           dayName={selectedDay} 
//           dayData={MOCK_DATA[selectedDay]} 
//           onClose={() => setSelectedDay(null)} 
//         />
//       )}

//       {showGroceryList && (
//         <div className="grocery-modal-overlay" onClick={() => setShowGroceryList(false)}>
//           <div className="grocery-modal" onClick={e => e.stopPropagation()}>
//             <div className="grocery-header">
//               <h2>Your Shopping List</h2>
//               <button className="close-btn" onClick={() => setShowGroceryList(false)}>X</button>
//             </div>
//             <ul className="grocery-items">
//               {groceryList.length > 0 ? (
//                 groceryList.map((item, index) => (
//                   <li key={index}><input type="checkbox" /> {item}</li>
//                 ))
//               ) : (
//                 <p>No meals planned yet! Add meals to generate a list.</p>
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Planner;





import React, { useState } from 'react';
import DayColumn from '../../components/DayColumn/DayColumn';
import PlannerSlot from '../../components/PlannerSlot/PlannerSlot';
import './Planner.css';

const MOCK_DATA = {
  Monday: {
    totalNutrients: { calories: 2340, protein: 120, fat: 60, carbs: 285 },
    meals: {
      breakfast: { name: "Avocado Toast" },
      lunch: { name: "Chicken Salad" },
      dinner: { name: "Spaghetti Bolognese" }
    }
  },
  Tuesday: { totalNutrients: { calories: 2100, protein: 110, fat: 55, carbs: 250 }, meals: {} },
  Wednesday: { totalNutrients: { calories: 2200, protein: 115, fat: 58, carbs: 260 }, meals: {} },
  Thursday: { totalNutrients: { calories: 2400, protein: 125, fat: 65, carbs: 290 }, meals: {} },
  Friday: { totalNutrients: { calories: 2350, protein: 122, fat: 62, carbs: 280 }, meals: {} },
  Saturday: { totalNutrients: { calories: 2500, protein: 130, fat: 70, carbs: 300 }, meals: {} },
  Sunday: { totalNutrients: { calories: 2450, protein: 128, fat: 68, carbs: 295 }, meals: {} },
};

const Planner = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const daysOfWeek = Object.keys(MOCK_DATA);

  return (
    <div className="planner-container">
      <h1 className="planner-title">Weekly Planner</h1>
      
      <div className="days-row">
        {daysOfWeek.map(day => (
          <DayColumn 
            key={day} 
            dayName={day} 
            onClick={() => setSelectedDay(day)} 
            isActive={selectedDay === day}
          />
        ))}
      </div>

      {selectedDay && (
        <PlannerSlot 
          dayName={selectedDay} 
          dayData={MOCK_DATA[selectedDay]} 
          onClose={() => setSelectedDay(null)} 
        />
      )}
    </div>
  );
};

export default Planner;
