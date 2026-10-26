/**
 * Enriched dummyMealPlan conforming to Phase 2 Shared Data Contract (HAR-P01)
 */
const dummyMealPlan = {
  monday: {
    breakfast: {
      id: "1",
      name: "Oats & Berries",
      image: "https://www.themealdb.com/images/media/meals/1550441882.jpg",
      nutrients: { calories: 340, protein: 12, carbs: 58, fat: 6 },
      prepTime: "10 mins",
      tags: ["Vegan", "High Fiber", "Breakfast"],
      ingredients: [
        { name: "Rolled Oats", measure: "1 cup", category: "Pantry" },
        { name: "Blueberries", measure: "0.5 cup", category: "Fruits" },
        { name: "Almond Milk", measure: "1 cup", category: "Dairy" }
      ]
    },
    lunch: {
      id: "2",
      name: "Butter Chicken",
      image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
      nutrients: { calories: 520, protein: 42, carbs: 22, fat: 28 },
      prepTime: "30 mins",
      tags: ["High Protein", "Indian", "Lunch"],
      ingredients: [
        { name: "Chicken Breast", measure: "300g", category: "Meat" },
        { name: "Butter", measure: "30g", category: "Dairy" },
        { name: "Tomato Puree", measure: "150ml", category: "Produce" }
      ]
    },
    dinner: {
      id: "3",
      name: "Caesar Salad",
      image: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
      nutrients: { calories: 380, protein: 18, carbs: 14, fat: 24 },
      prepTime: "15 mins",
      tags: ["Light", "Keto Friendly", "Dinner"],
      ingredients: [
        { name: "Romaine Lettuce", measure: "1 head", category: "Produce" },
        { name: "Parmesan Cheese", measure: "40g", category: "Dairy" },
        { name: "Caesar Dressing", measure: "2 tbsp", category: "Pantry" }
      ]
    }
  },
  tuesday: {
    breakfast: {
      id: "4",
      name: "Scrambled Eggs & Toast",
      image: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
      nutrients: { calories: 390, protein: 22, carbs: 28, fat: 18 },
      prepTime: "12 mins",
      tags: ["Quick", "High Protein"],
      ingredients: [
        { name: "Eggs", measure: "3 large", category: "Dairy" },
        { name: "Sourdough Toast", measure: "2 slices", category: "Pantry" },
        { name: "Butter", measure: "10g", category: "Dairy" }
      ]
    },
    lunch: null,
    dinner: {
      id: "5",
      name: "Margherita Pizza",
      image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      nutrients: { calories: 640, protein: 24, carbs: 78, fat: 26 },
      prepTime: "25 mins",
      tags: ["Vegetarian", "Italian"],
      ingredients: [
        { name: "Pizza Dough", measure: "1 ball", category: "Pantry" },
        { name: "Mozzarella Cheese", measure: "150g", category: "Dairy" },
        { name: "Fresh Basil", measure: "1 bunch", category: "Produce" }
      ]
    }
  },
  wednesday: {
    breakfast: null,
    lunch: {
      id: "6",
      name: "Dal Rice & Veggies",
      image: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
      nutrients: { calories: 450, protein: 16, carbs: 74, fat: 8 },
      prepTime: "20 mins",
      tags: ["Comfort Food", "Vegan"],
      ingredients: [
        { name: "Lentils", measure: "1 cup", category: "Pantry" },
        { name: "Basmati Rice", measure: "1 cup", category: "Pantry" }
      ]
    },
    dinner: null
  },
  thursday: { breakfast: null, lunch: null, dinner: null },
  friday: { breakfast: null, lunch: null, dinner: null },
  saturday: { breakfast: null, lunch: null, dinner: null },
  sunday: { breakfast: null, lunch: null, dinner: null }
};

export default dummyMealPlan;
